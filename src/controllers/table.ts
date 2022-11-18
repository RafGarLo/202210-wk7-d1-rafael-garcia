import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { Table } from '../entities/table.js';
import { HTTPError } from '../interfaces/error.js';

export class TableController {
    constructor(public repository: Data<Table>) {}

    async getAll(req: Request, resp: Response, next: NextFunction) {
        try {
            const tables = await this.repository.getAll();
            resp.json({ tables });
        } catch (error) {
            const httpError = new HTTPError(503, 'Service Unavailable', (error as Error).message);
            next(httpError);
        }
    }
    async get(req: Request, resp: Response, next: NextFunction) {
        try {
            const table = await this.repository.get(req.params.id);
            resp.json({ table });
        } catch (error) {
            next(this.#createHTTPError(error as Error));
        }
    }
    async post(req: Request, resp: Response, next: NextFunction) {
        try {
            const table = await this.repository.post(req.body);
            resp.json(({ table }));
        } catch (error) {
            const httpError = new HTTPError(
                503,
                'Service Unavailable',
                (error as Error).message
            );
            next(httpError);
        }
    }
    async patch(req: Request, resp: Response, next: NextFunction) {
        try {
            const table = await this.repository.patch(
                req.params.id,
                req.body
            );
            resp.json({ table })
        } catch (error) {
            next(this.#createHTTPError(error as Error));
        }
    }
    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.repository.delete(req.params.id);
            resp.json({})
        } catch (error) {
            next(this.#createHTTPError(error as Error));
            return;
        }
    } 
    #createHTTPError (error: Error) {
        if ((error as Error).message === 'id Not found') {
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
