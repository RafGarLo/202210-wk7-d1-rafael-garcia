import { Car } from "../interfaces/car";
import { Data, id } from "./data";
import fs from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();
export class CarFileData implements Data<Car> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }
    async getAll(): Promise<Array<Car>> {
        return fs
        .readFile(this.dataFileURL, 'utf-8')
        .then((data) => JSON.parse(data).cars as Array<Car>);
    }
    async get(id: id): Promise<Car> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data).cars as Array<Car>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error('id Not Found');
            return item;
        });
    }
    async post(newCar: Partial<Car>): Promise<Car> {
        const aData = await this.getAll();
        const finalCar = {
            ...(newCar as Car),
            id: this.#createID(),
        };
        aData.push(finalCar);
        await this.#saveData(aData);
        return finalCar;
    }
    async patch(id: id, updateCar: Partial<Car>): Promise<Car> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('id Not Found');

        aData[index] = {
            ...aData[index],
            ...updateCar,
        };
        await this.#saveData(aData);
        return aData[index];
    }
    async delete(id: id): Promise<void> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (index < 0) throw new Error('id Not Found');
        aData.filter((item) => item.id !== id);
        const finalData = aData.filter((item) => item.id !== id);
        await this.#saveData(finalData);
    }
    #createID() {
        return Math.trunc(Math.random() * 1_000_000);
    }
    #saveData(data: Array<Car>) {
        const finalData = { products: data }
        return fs.writeFile(this.dataFileURL, JSON.stringify(finalData));
    }
  }
