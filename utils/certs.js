const fs = require('fs');
const CONFIG = require('../config');

const CERTS = {
    key: fs.readFileSync(CONFIG.KEY_PATH),
    cert: fs.readFileSync(CONFIG.CERT_PATH)
};

module.exports = CERTS;