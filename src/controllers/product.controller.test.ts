import { ProductController } from './product.controller';
import { Request, Response } from 'express';
import { ProductFileData } from '../data/products.file.data.js';

describe('Given productController', () => {
    const model = new ProductFileData();
    const productController = new ProductController(model);
    const req = {};
    const resp = {
        json: jest.fn(),
        end: jest.fn(),
    };
    test('Then...getAll action gets tested', () => {
        productController.getAll(req as Request, resp as unknown as Response);
        expect(resp.json).toHaveBeenCalled();
        expect(resp.end).toHaveBeenCalled();
    });
});
