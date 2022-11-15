import { CustomError, HTTPError } from './error.js';

describe('Given', () => {
    let error: CustomError;
    beforeEach(() => {
        error = new HTTPError(418, 'Tea Pot', 'ja ja ja');
    });
    test('it should first', () => {
        expect(error).toBeInstanceOf(Error);
        expect(error).toBeInstanceOf(HTTPError);
        expect(error).toHaveProperty('statusCode', 418);
        expect(error).toHaveProperty('statusMessage', 'Tea Pot');
        expect(error).toHaveProperty('message', 'ja ja ja');
        expect(error).toHaveProperty('name', 'HTTPError');
    });
});
