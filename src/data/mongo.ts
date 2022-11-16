import * as dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
const uri = `mongodb+srv://${process.env.USER}${process.env.PASSWORD}${process.env.CLUSTER}`;
const connector = async () => {
  return await mongoose.connect(uri)
}
console.log(connector())

