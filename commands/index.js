const wol = require('wake_on_lan');
const { NodeSSH } = require('node-ssh');
const ping = require('ping');

class Client {
    powerOn({ address, mac }) {
        wol.wake(mac, { address }, error => {
            if (error) return error.message;
        });
    }

    powerOff({ address, port, username, password, cmd }) {
        let ssh = new NodeSSH();
        ssh.connect({
            host: address,
            port, 
            username,
            password
        }).then(() => {
            ssh.execCommand(cmd);
        });
    }
    
    // ! This method doesn't work and should not be called
    isAlive({ address }) {
        ping.sys.probe(address, response => {
            return response;
        });
    }
}

module.exports = { Client };