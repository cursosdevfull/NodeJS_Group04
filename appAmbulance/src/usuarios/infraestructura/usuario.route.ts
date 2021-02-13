import express, { Router } from 'express';
import { AutenticacionGuard } from '../../compartido/infraestructura/guards/autenticacion.guard';
import { AutorizacionGuard } from '../../compartido/infraestructura/guards/autorizacion.guard';
import SchemaValidator from '../../compartido/infraestructura/validador';
import { UsuarioUseCase } from '../aplicacion/usuario.usecase';
import { UsuarioController } from './usuario.controller';
import { UsuarioOperation } from './usuario.operation';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new UsuarioUseCase(operation);
const controller = new UsuarioController(usecase);

router.get(
	'/',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate({ id: 'number', activo: 'boolean' }),
	controller.getAll
);
router.get(
	'/page/:page/:pageSize',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	controller.getByPage
);
router.get('/search', controller.getSearch);
router.get(
	'/:id',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	controller.getById
);
router.post(
	'/',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	controller.insert
);
router.put(
	'/:id',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	controller.update
);
router.delete(
	'/:id',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	controller.delete
);

export { router };
