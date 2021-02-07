import express, { Router } from 'express';
import { PilotoUseCase } from '../aplicacion/piloto.usecase';
import { PilotoController } from './piloto.controller';
import { PilotoOperation } from './piloto.operation';

const router: Router = express.Router();
const operation = new PilotoOperation();
const usecase = new PilotoUseCase(operation);
const controller = new PilotoController(usecase);

router.get('/', controller.getAll);
router.get('/page/:page/:pageSize', controller.getByPage);
router.get('/search', controller.getSearch);
router.get('/:id', controller.getById);
router.post('/', controller.insert);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router };
