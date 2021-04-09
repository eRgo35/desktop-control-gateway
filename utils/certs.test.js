const CERTS = require("./certs");

describe('CERTS', () => {
    it('has a `key` property', () => {
        expect(CERTS).toHaveProperty('key');
    });

    it('has a `cert` property', () => {
        expect(CERTS).toHaveProperty('cert');
    });
});