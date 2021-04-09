const fs = require('fs');

const CERTS = {
    key: fs.readFileSync('./sslcert/key.pem'),
    cert: fs.readFileSync('./sslcert/cert.pem')
};

module.exports = CERTS;