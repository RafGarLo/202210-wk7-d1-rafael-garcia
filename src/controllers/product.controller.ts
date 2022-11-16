import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { HTTPError } from '../interfaces/error.js';
import { Product } from '../interfaces/product.js';

export class ProductController {
    constructor(public dataModel: Data<Product>) {}

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service Unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get(+req.params.id);
            resp.json(data);
        } catch (error) {
            next(this.#createHTTPError(error as Error));
            return;
        }
    }
        
    
    async post(req: Request, resp: Response, next: NextFunction) {
        if (!req.body.name) {
            const httpError = new HTTPError(
                406,
                'Not Acceptable',
                'Name not included in the data'
            );
            next(httpError);
            return;
        }

        try {
            const newProduct = await this.dataModel.post(req.body);
            resp.json(newProduct).end();
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service Unavailable',
                (error as Error).message
            );
            next(httpError);
            return;
        }
    }
    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateProduct = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updateProduct).end();
        } catch (error) {
            next(this.#createHTTPError(error as Error));
            return;
            
        }
    }
    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.dataModel.delete(+req.params.id);
            resp.json({}).end();
        } catch (error) {
            next(this.#createHTTPError(error as Error));
            return;
        }
    }
    #createHTTPError (error: Error) {
        if ((error as Error).message === 'Not found id') {
            const httpError = new HTTPError(
                404,
                'Not Found',
                (error as Error).message
            );
            return httpError;
            
        }
        const httpError = new HTTPError(
            503,
            'Service unavailable',
            (error as Error).message
        );
        return httpError;
    }
}
