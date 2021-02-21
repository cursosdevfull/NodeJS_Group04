import express, { Router } from 'express';
import { Errors } from '../../compartido/infraestructura/errors';
import { UsuarioOperation } from '../../usuarios/infraestructura/usuario.operation';
import { AuthUseCase } from '../aplicacion/auth.usecase';
import { AuthController } from './auth.controller';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new AuthUseCase(operation);
const controller = new AuthController(usecase);

router.post('/login', Errors.asyncError(controller.login));

export { router };
