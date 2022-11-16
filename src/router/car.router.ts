import { Router } from 'express';
import { CarController } from '../controllers/car.controller';
import { CarFileData } from '../data/car.file.data';

export const carRouter = Router();

const controller = new CarController( new CarFileData());

carRouter.get('/', controller.find.bind(controller));

carRouter.get('/:id', controller.findById.bind(controller));

carRouter.post('/', controller.create.bind(controller));

carRouter.patch('/:id', controller.findByIdAndUpdate.bind(controller));

carRouter.delete('/:id', controller.findByIdAndDelete.bind(controller));
