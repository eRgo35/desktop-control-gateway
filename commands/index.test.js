const { Client } = require(".");

describe('Commands', () => {
    var client;
    client = new Client();

    it('creates a new instance of Client class', () => {
        expect(client).toBeInstanceOf(Client);
    });
});