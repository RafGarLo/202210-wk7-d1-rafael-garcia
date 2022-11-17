import mongoose from "mongoose";

export function dbConnect() {
    const DBName = process.env.NODE_ENV !== 'test' ? 'Tables' : 'CodersTesting';
    let uri = `mongodb+srv://${process.env.USER}${process.env.PASSWORD}`;
    uri += `${process.env.CLUSTER}${DBName}?retryWrites=true&w=majority`;
    console.log(uri)
    return mongoose.connect(uri);
}
