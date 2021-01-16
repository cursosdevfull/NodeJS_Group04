import express from 'express';
import { MedicoController } from './medico.controller';
import { MedicoUseCase } from '../aplicacion/medico.usecase';
import { MedicoOperation } from './medico.operation';

const router = express.Router();
const operation = new MedicoOperation();
const usecase = new MedicoUseCase(operation);
const controller = new MedicoController(usecase);

router.get('/', (req, res) => {
	res.json(controller.getAll());
});
router.get('/:id', controller.getOne);
router.get('/page/:page', controller.getByPage);
router.post('/', controller.insert);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);

export { router };
