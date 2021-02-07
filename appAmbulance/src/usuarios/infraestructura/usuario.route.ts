import express, { Router } from 'express';
import { UsuarioUseCase } from '../aplicacion/usuario.usecase';
import { UsuarioController } from './usuario.controller';
import { UsuarioOperation } from './usuario.operation';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new UsuarioUseCase(operation);
const controller = new UsuarioController(usecase);

router.get('/', controller.getAll);
router.get('/page/:page/:pageSize', controller.getByPage);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getById);
router.post('/', controller.insert);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router };
