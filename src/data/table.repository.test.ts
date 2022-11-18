import mongoose from "mongoose";
import { dbConnect } from "../db.connect";
import { TableRepository } from "./table.repository";

const mockData = [
    {
        name: 'mesita',
        material: 'roble',
        recycled: true,
    },
    {
        name: 'mesa',
        material: 'pino',
        recycled: false,
    },
];
describe('Given ...', () => {
    const repository = new TableRepository();
    let testIds : Array<string>;
    beforeAll(async () => {
        await dbConnect();
        await repository.getModel().deleteMany();
        await repository.getModel().insertMany(mockData);
        const data = await repository.getModel().find();
        testIds = [data[0].id, data[1].id];
    });
    test('Then getAll...', async () => {
        const result = await repository.getAll();
        expect(result[0].name).toEqual(mockData[0].name);
    });
    test('Then post should return the new object', async () => {
        const newTable = {
            name: 'mesaza',
        };
        const result = await repository.post(newTable);
        expect(result.name).toEqual(newTable.name);
    });
    test('Then patch should return the object with the updated property', async () => {
        const updatedTable = {
        name: 'meson',
        };
    const result = await repository.patch(testIds[0], updatedTable);
    expect(result.name).toEqual(updatedTable.name);
    });
    test('then the delete method should return an empty object', async () => {
        const result = await repository.delete(testIds[0]);
        expect(result).toBeUndefined();
    })
    test('if delete method is incorrect , it should return an empty object', async () => {
        expect(async () => {
            await repository.delete(testIds[3])}).rejects.toThrowError();
    })
    afterAll(() => {
        mongoose.disconnect();
    });
})
