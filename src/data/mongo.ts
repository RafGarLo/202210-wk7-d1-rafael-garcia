import * as dotenv from 'dotenv';
dotenv.config({path:'../../.env'});

import mongoose from 'mongoose';

const uri = `mongodb+srv://${process.env.USER}${process.env.PASSWORD}${process.env.CLUSTER}`;
console.log(uri);

(async () => {
    
    const connector = await mongoose.connect(uri)
    console.log(connector)
    //console.log(mongoose.connection.readyState)
    // const Product = model('Product', productSchema, 'products');

//await Product.create({name:'chair', category: 'office', overview: 'very nice', price: '150'});

    connector.disconnect()
})

// const productSchema = new Schema ({

//     name: String,
//     category: String,
//     overview: String,
//     price: String,
// })
