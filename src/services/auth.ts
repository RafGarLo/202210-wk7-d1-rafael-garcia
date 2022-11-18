import { SECRET } from '../config.js';
import jwt from 'jsonwebtoken';


export const createToken = (payload: {userName: string}) => {
    if(typeof SECRET !== 'string') throw new Error() 
    return jwt.sign(payload, SECRET)
}

export const readToken = (token: string) => {
    if(typeof SECRET !== 'string') throw new Error(); 
    const payload = jwt.verify(token, SECRET);
    if (typeof payload === 'string') throw new Error();
    return payload;
}
