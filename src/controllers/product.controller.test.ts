import { ProductController } from './product.controller';
import { NextFunction, Request, Response } from 'express';
import { ProductFileData } from '../data/products.file.data';

describe('Given productController', () => {
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    const next = jest.fn();

    test('Then...getAll action gets tested', async () => {
        const model = new ProductFileData();
        const productController = new ProductController(model);

        await productController.getAll(
            req as Request,
            resp as unknown as Response,
            next as NextFunction
        );
        expect(resp.json).toHaveBeenCalled();
        //expect(resp.end).toHaveBeenCalled();
    });
});
