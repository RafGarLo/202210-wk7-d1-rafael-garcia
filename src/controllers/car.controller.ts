import { NextFunction, Request, Response } from 'express';
import { Data } from '../data/data.js';
import { Car } from '../interfaces/car.js';
import { HTTPError } from '../interfaces/error.js';

export class CarController {
    constructor(public dataModel: Data<Car>) {}

    async find(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.getAll();
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(503, 'Service Unavailable', (error as Error).message);
            next(httpError);
            return;
        }
    }
    
    async findById(req: Request, resp: Response, next: NextFunction) {
        try {
            const data = await this.dataModel.get;
            resp.json(data).end();
        } catch (error) {
            const httpError = new HTTPError(503, 'Service Unavailable', (error as Error).message);
            next(httpError);
            return;
        }
    }
    async create(req: Request, resp: Response, next: NextFunction) {
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
            const newCar = await this.dataModel.post(req.body);
            resp.json(newCar).end();
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
    async findByIdAndUpdate(req: Request, resp: Response, next: NextFunction) {
        try {
            const updateCar = await this.dataModel.patch(
                +req.params.id,
                req.body
            );
            resp.json(updateCar).end();
        } catch (error) {
            next(this.#createHTTPError(error as Error));
            return;
            
        }
    }
    async findByIdAndDelete(req: Request, resp: Response, next: NextFunction) {
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