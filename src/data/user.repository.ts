import mongoose, { Schema, model } from "mongoose";
import { ProtoUser, User } from "../entities/user.js";
import { UsersData } from "./data.users.js";

export class UserRepository implements UsersData<User> {
    #schema = new Schema({
        name: {
            type: String,
            required: true,
            unique: true,
        },
        email: String,
        password: String,
        Role: String
    });
    #Model = model('User', this.#schema, 'users');

    constructor() {
        this.#schema.set('toJSON', {
            transform: (_document, returnedObject) => {
                returnedObject.id = returnedObject._id;
                delete returnedObject.__v;
                delete returnedObject._id;
            },
        })
    }
    //getAll: () => Promise<User[]>;
    //get: (id: string) => Promise<User>;
    //patch: (id: string, data: Partial<User>) => Promise<User>;
    //delete: (id: string) => Promise<void>;
    // async getAll(): Promise<Array<Table>> {
    //     return this.#Model.find();
    // }
    // async get(id: id): Promise<Table> {
    //     const result = await this.#Model.findById(id); 
    //     if (!result) throw new Error('Not found id');
    //     return result as Table;
    // }
    async post(data: ProtoUser): Promise<User> {
        const result = await this.#Model.create(data);
        return result as User;
    }
    // async patch(id: id, data: Partial<Table>): Promise<Table> {
    //     const result = await this.#Model.findByIdAndUpdate(id, data, {
    //         new: true,
    //     });
    //     if (!result) throw new Error('Not found id');
    //     return result as Table;
    // }
    // async delete(id: id): Promise<void> {
    //     const result = await this.#Model.findByIdAndDelete(id);
    //     if (result === null) throw new Error('Not found id');
    //     return;
    // }
    #disconnect() {
        mongoose.disconnect();
        console.log(mongoose.connection.readyState);
    }

    getModel() {
        return this.#Model;
    }    
}
