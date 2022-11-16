import { Product } from '../interfaces/product.js';
import { Data, id } from './data.js';
import fs from 'fs/promises';
import * as dotenv from 'dotenv';
dotenv.config();

export class ProductFileData implements Data<Product> {
    dataFileURL: string;
    constructor() {
        this.dataFileURL = process.env.DATA_FILE || '';
    }

    async getAll(): Promise<Array<Product>> {
        return fs
            .readFile(this.dataFileURL, 'utf-8')
            .then((data) => JSON.parse(data).products as Array<Product>);
    }
    async get(id: id): Promise<Product> {
        return fs.readFile(this.dataFileURL, 'utf-8').then((data) => {
            const aData = JSON.parse(data).products as Array<Product>;
            const item = aData.find((item) => item.id === id);
            if (!item) throw new Error('id Not Found');
            return item;
        });
    }

    async post(newProduct: Partial<Product>): Promise<Product> {
        const aData = await this.getAll();
        const finalProduct = {
            ...(newProduct as Product),
            id: this.#createID(),
        };
        aData.push(finalProduct);
        await this.#saveData(aData);
        return finalProduct;
    }
    
    async patch(id: id, updateProduct: Partial<Product>): Promise<Product> {
        const aData = await this.getAll();
        const index = aData.findIndex((item) => item.id === id);
        if (!index) throw new Error('id Not Found');

        aData[index] = {
            ...aData[index],
            ...updateProduct,
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
    #saveData(data: Array<Product>) {
        const finalData = { products: data }
        return fs.writeFile(this.dataFileURL, JSON.stringify(finalData));
    }
}
