import { Router } from 'express';
import { UserController } from '../controllers/user.js';
import { UserRepository } from '../data/user.repository.js';



export const userRouter = Router();

const controller = new UserController(new UserRepository());

//tableRouter.get('/', controller.getAll.bind(controller));
// Alternativa: aprovechar el lexical scope de las arrow functions
// taskRouter.get('/', (req, resp) => controller.getAll(req, resp));
//userRouter.get('/:id', controller.get.bind(controller));
userRouter.post('/', controller.post.bind(controller));
userRouter.post('/', controller.post.bind(controller));
//tableRouter.patch('/:id', controller.patch.bind(controller));
//tableRouter.delete('/:id', controller.delete.bind(controller));
