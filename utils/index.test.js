const verifyKey = require(".");

describe('verifyKey()', () => {
    let key;
    let logMock = jest.fn();
    global.console.log = logMock;

    beforeEach(() => {
        key = verifyKey();
    });
    
    it('returns a key and logs to console', () => {
        expect(key).toEqual(expect.any(String));
        expect(logMock).toHaveBeenCalled();
    });
});