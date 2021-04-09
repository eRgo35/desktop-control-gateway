const NOW = require('./logger');

describe('NOW()', () => {
    it('returns current time in hh:mm:ss format', () => {
        expect(NOW()).toMatch(/[0-9]{2}\:[0-9]{2}\:[0-9]{2}/);
    });
});