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
    test('Then post ...', async () => {
        const newTable = {
            name: 'mesaza',
        };
        const result = await repository.post(newTable);
        expect(result.name).toEqual(newTable.name);
    });
    afterAll(() => {
        mongoose.disconnect();
    });
})