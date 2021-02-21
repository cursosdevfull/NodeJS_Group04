import express, { Router } from 'express';
import { Errors } from '../../compartido/infraestructura/errors';
import { AutenticacionGuard } from '../../compartido/infraestructura/guards/autenticacion.guard';
import { AutorizacionGuard } from '../../compartido/infraestructura/guards/autorizacion.guard';
import SchemaValidator from '../../compartido/infraestructura/validador';
import { UsuarioUseCase } from '../aplicacion/usuario.usecase';
import { UsuarioController } from './usuario.controller';
import { UsuarioOperation } from './usuario.operation';

import { schemas as UsuarioSchema } from './usuario.schema';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new UsuarioUseCase(operation);
const controller = new UsuarioController(usecase);

router.get(
	'/',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate(UsuarioSchema.GET_ALL),
	Errors.asyncError(controller.getAll)
);
router.get(
	'/page/:page/:pageSize',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate(UsuarioSchema.GET_PAGINATION),
	Errors.asyncError(controller.getByPage)
);
router.get('/search', controller.getSearch);
router.get(
	'/:id',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate(UsuarioSchema.GET_ONE),
	Errors.asyncError(controller.getById)
);
router.post(
	'/',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate(UsuarioSchema.POST_INSERT),
	Errors.asyncError(controller.insert)
);
router.put(
	'/:id',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate(UsuarioSchema.PUT_UPDATE),
	Errors.asyncError(controller.update)
);
router.delete(
	'/:id',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	Errors.asyncError(controller.delete)
);

export { router };
