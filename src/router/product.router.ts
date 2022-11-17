import { ProductController } from '../controllers/product.controller.js';
import { Router } from 'express';
import { ProductFileData } from '../data/products.file.data.js';

export const productRouter = Router();

const controller = new ProductController(new ProductFileData());



productRouter.get('/', controller.getAll.bind(controller));

productRouter.get('/:id', controller.get.bind(controller));

productRouter.post('/', controller.post.bind(controller));

productRouter.patch('/:id', controller.patch.bind(controller));

productRouter.delete('/:id', controller.delete.bind(controller));
