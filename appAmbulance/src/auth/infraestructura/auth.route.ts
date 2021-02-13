import express, { Router } from 'express';
import { UsuarioOperation } from '../../usuarios/infraestructura/usuario.operation';
import { AuthUseCase } from '../aplicacion/auth.usecase';
import { AuthController } from './auth.controller';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new AuthUseCase(operation);
const controller = new AuthController(usecase);

router.post('/login', controller.login);

export { router };
