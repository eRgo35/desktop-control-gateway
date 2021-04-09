const fs = require('fs');
const NOW = require('./logger');
const generateKey = require('./generator');
const chalk = require('chalk');

const verifyKey = () => {
    if(!fs.existsSync("./key.token")) {
        let id = generateKey();
        fs.writeFile('./key.token', id, (err) => {
            if (err) return console.log(err);
            console.log(chalk.red(`[${NOW()}] IMPORTANT > Your API KEY is: ${id}`));
            console.log(chalk.red(`[${NOW()}] IMPORTANT > Don't share it with anyone!`));
            console.log(chalk.red(`[${NOW()}] IMPORTANT > In case you need it again, KEY is stored in "key.token" file`));
          });
        var KEY = id;
        console.log(chalk.green(`[${NOW()}] SUCCESS > KEY loaded successfully!`));
    }
    else {
        var KEY = fs.readFileSync("./key.token", "utf-8", err => console.log(err));
        console.log(chalk.green(`[${NOW()}] SUCCESS > KEY loaded successfully!`));
    }
    return KEY;
}

module.exports = verifyKey;