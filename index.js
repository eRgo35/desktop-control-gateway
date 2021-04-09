const NOW = require('./utils/logger'); // Imports current time in hh:mm:ss format
const chalk = require('chalk'); // Formatting Module
console.log(chalk.cyan(`[${NOW()}] LOADING > Logger loaded successfully!`));
const app = require('express')();
const https = require('https');
const http = require('http');
const bodyParser = require('body-parser');
console.log(chalk.cyan(`[${NOW()}] LOADING > Express loaded successfully!`));
const cors = require('cors');
console.log(chalk.cyan(`[${NOW()}] LOADING > CORS loaded successfully!`));
const ping = require('ping');
console.log(chalk.cyan(`[${NOW()}] LOADING > Ping loaded successfully!`));

const verifyKey = require('./utils'); //Imports key verification tool
console.log(chalk.cyan(`[${NOW()}] LOADING > VerifyKey loaded successfully!`));
const { Client } = require('./commands'); // Imports all commands as Client class
console.log(chalk.cyan(`[${NOW()}] LOADING > Commands loaded successfully!`));

const KEY = verifyKey(); // Asigns an existing or a new key
const PORT = 3001; // Server Port
var CERTS, SERVER; // Variable initialization

// Tries to create an https server
// if it fails, tries to create an http server
try {
    CERTS = require('./utils/certs'); // Loads SSL certificates
    console.log(chalk.green(`[${NOW()}] SUCCESS > SSL certificates loaded successfully!`));
    SERVER = https.createServer(CERTS, app); // Tries to create a server
    SERVER.listen(PORT, () => { // Server starts to listen for incoming requests 
        console.log(chalk.green(`[${NOW()}] SUCCESS > Listening at https://localhost:${PORT}`));
    });
}
catch(err) { // If SSL certs doesn't exist, tries too create an http server instead
    SERVER = http.createServer(app);
    SERVER.listen(PORT, () => { // Server starts to listen for incoming requests
        console.log(`[${NOW()}] SUCCESS > Listening at http://localhost:${PORT}`);
    });
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Allows CORS policy (for developmnet purposes)
 
// Only checks if credentials are valid
// ! Should not be used as auth service ! //
app.post('/api/auth', (req, res) => {
    if (req.body.key === KEY) {
        res.status(200).send({ short: 'Success', message: 'Key is correct' });
        console.log(`[${NOW()}] LOG > Successful auth request detected`);
    }
    else {
        res.status(401).send({ short: 'Error', message: "Key is incorrect" });
        console.log(`[${NOW()}] LOG > Unsuccessful auth request detected`);
    }
});

// Manages target machine based on command provided in the request
app.post('/api/manage', (req, res) => {
    const client = new Client();
    // Checks if provided password is correct
    if (req.body.key === KEY) {
        // Checks if provided command exists
        switch (req.body.command) {
            case "powerOn": // required arguments are: mac; optional: broadcast
                try {
                    var address = req.body.broadcast;
                    var mac = req.body.mac;
                    if (mac === undefined) throw { message: 'MAC address is not defined' };
                    client.powerOn({ address, mac });
                    res.status(200).send({ 
                        short: `Packet Sent`,
                        message: `Sent Magic Packet to ${mac} using ${address} broadcast address` 
                    });
                }
                catch (err) {
                    res.status(400).send({
                        short: `Error`,
                        message: err.message
                    });
                }
                console.log(`[${NOW()}] WARNING > powerOn command request detected`);
                break;
    
            case "powerOff": // required arguments are: ip address, username, password and shutdown command; optional: port
                try {
                    var address = req.body.address;
                    var port = req.body.port;
                    var username = req.body.username;
                    var password = req.body.password;
                    var cmd = req.body.shutdownCmd;
                    if (address === undefined) throw { message: 'Address is not defined' };
                    if (port === undefined) port = 22;
                    if (username === undefined) throw { message: 'Username is not defined' };
                    if (password === undefined) throw { message: 'Password is not defined' };
                    if (cmd === undefined) throw { message: 'ShutdownCmd is not defined' };
                    client.powerOff({ address, port, username, password, cmd });
                    res.status(200).send({
                        short: 'Command Executed',
                        message: `Sent shutdown command to ${address}`
                    });
                }
                catch (err) {
                    res.status(400).send({
                        short: `Error`,
                        message: err.message
                    });
                }
                console.log(`[${NOW()}] LOG > powerOff command request detected`);
                break;

            case "isAlive": // required arguments are: ip address
                try {
                    var address = req.body.address;
                    if (address === undefined) throw { message: 'Address is not defined' };
                    //// isAlive({ address });
                    // TODO Move this to an independent function
                    // * The only bug is that when you move this code
                    // * to the separate function, node doesn't wait until
                    // * callback is resolved and undefined is returned
                    // Pings target and returns response
                    ping.sys.probe(address, response => {
                        res.status(200).send({  
                            short: response ? "Online" : "Offline", 
                            message: `Host ${address} is ${response ? 'Online' : 'Offline'}`
                        });
                    });
                }
                catch(err) {
                    res.status(400).send({
                        short: `Error`,
                        message: err.message
                    });
                }
                console.log(`[${NOW()}] LOG > isAlive command request detected`);
                break;

            default:
                res.status(400).json({ short: 'Unknown', message: 'Unknown command' });
                console.log(`[${NOW()}] LOG > Unknown command request detected`);
        }
    }
    else {
        res.status(401).json({ short: 'Unauthorized', message: 'Access Denied. Not authorized!' });
        console.log(chalk.red(`[${NOW()}] WARNING > Unauthorized request detected`));
    }
});