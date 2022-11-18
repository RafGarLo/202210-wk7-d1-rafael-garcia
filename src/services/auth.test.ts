import { createToken, readToken } from "./auth.js"
import jwt from 'jsonwebtoken';
import { SECRET } from '../config.js';

describe('Given createToken ', () => {
    const signSpy = jest.spyOn(jwt, 'sign')
    const mock = {
        userName: 'Pepe'
    }
    test('When user authenticates', () => {
    const result = createToken(mock);
    expect(typeof result).toBe('string')
    expect(signSpy).toHaveBeenCalled()
    expect(signSpy).toHaveBeenCalledWith(mock, SECRET)
    })
})

describe('Given readToken ', () => {
    const mock = {
        userName: 'Pepe'
    }
    describe('When token is valid', () => {
        const token = createToken(mock)
        test('then', () => {
        const result = readToken(token);
        expect(result.userName).toEqual(mock.userName)
        })
    })
    describe('When token is not valid', () => {
        const token = 'asdfasfasdfasdfasdfwerq2rqwer';
        test('it Should throw error', () => {
            expect(() => {
                readToken(token).toThrow()
            })
        })
    })
    

    test('Should', () => {
//
    })

//
})
