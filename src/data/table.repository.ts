import mongoose, { Schema, model } from "mongoose";
import { ProtoTable, Table } from "../entities/table.js";
import { Data, id } from "./data.js";

export class TableRepository implements Data<Table> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        material: String,
        recycled: Boolean,
    });
    #Model = model('Table', this.#schema, 'tables');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        })
    }
    async getAll(): Promise<Array<Table>> {
        return this.#Model.find();
    }
    async get(id: id): Promise<Table> {
        const result = await this.#Model.findById(id); 
        if (!result) throw new Error('Not found id');
        return result as Table;
    }
    async post(data: ProtoTable): Promise<Table> {
        const result = await this.#Model.create(data);
        return result as Table;
    }
    async patch(id: id, data: Partial<Table>): Promise<Table> {
        const result = await this.#Model.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!result) throw new Error('Not found id');
        return result as Table;
    }
    async delete(id: id): Promise<void> {
        const result = await this.#Model.findByIdAndDelete(id);
        if (result === null) throw new Error('Not found id');
        return;
    }
    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }    
}
