const generateKey = require("./generator");

describe('generateKey()', () => {
    var key;

    it('returns a string', () => {
        key = generateKey();
        expect(key).toEqual(expect.any(String));
    });

    it('is 64 characters long', () => {
        expect(key.length).toBe(64);
    });

    it('is random', () => {
        let key1 = generateKey();
        let key2 = generateKey();

        expect(key1).not.toEqual(key2);
    });
});