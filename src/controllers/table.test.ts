import { NextFunction, Request, Response } from "express";
import { TableRepository } from "../data/table.repository";
import { TableController } from "./table";

jest.mock('../data/table.repository');
describe('Given tableController', () => {
    TableRepository.prototype.getAll = jest.fn().mockResolvedValue(['mesilla']);
    const repository = new TableRepository();
    const tableController = new TableController(repository);
    const req: Partial<Request> = {};
    const resp: Partial<Response> = {
        json: jest.fn(),
    };
    const next: NextFunction = jest.fn();
    test('Then...getAll', async () => {
        await tableController.getAll(req as Request, resp as Response, next);
        expect(resp.json).toHaveBeenLastCalledWith({ tables: ['mesilla']});
    }); 
});