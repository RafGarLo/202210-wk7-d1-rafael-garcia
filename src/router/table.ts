import { Router } from 'express';
import { TableRepository } from '../data/table.repository.js';
import { TableController } from '../controllers/table.js';


export const tableRouter = Router();

const controller = new TableController(new TableRepository());

tableRouter.get('/', controller.getAll.bind(controller));
// Alternativa: aprovechar el lexical scope de las arrow functions
// taskRouter.get('/', (req, resp) => controller.getAll(req, resp));
tableRouter.get('/:id', controller.get.bind(controller));
tableRouter.post('/', controller.post.bind(controller));
tableRouter.patch('/:id', controller.patch.bind(controller));
tableRouter.delete('/:id', controller.delete.bind(controller));