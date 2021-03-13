import express, { Router } from 'express';
import { Errors } from '../../compartido/infraestructura/errors';
import { AutenticacionGuard } from '../../compartido/infraestructura/guards/autenticacion.guard';
import { AutorizacionGuard } from '../../compartido/infraestructura/guards/autorizacion.guard';
import { CacheRedis } from '../../compartido/infraestructura/middlewares/cache.middleware';
import { Upload } from '../../compartido/infraestructura/middlewares/upload.middleware';
import SchemaValidator from '../../compartido/infraestructura/validador';
import { UsuarioUseCase } from '../aplicacion/usuario.usecase';
import { UsuarioController } from './usuario.controller';
import { UsuarioOperation } from './usuario.operation';

import { schemas as UsuarioSchema } from './usuario.schema';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new UsuarioUseCase(operation);
const controller = new UsuarioController(usecase);
/**
 * @swagger
 * /users:
 *  get:
 *    tags:
 *      - User
 *    security:
 *      - JWTAuth: []
 *    description: List of users
 *    responses:
 *      "200":
 *        description: List of all users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  nombre:
 *                    type: string
 *                  correo:
 *                    type: string
 *                  password:
 *                    type: string
 *      "401":
 *         description: Credentials are invalid
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserForbidden"
 */
router.get(
	'/',
	AutenticacionGuard.canActivate,
	AutorizacionGuard.canActivate('ADMIN', 'MEDIC'),
	SchemaValidator.validate(UsuarioSchema.GET_ALL),
	CacheRedis.handle('LIST_USERS'),
	Errors.asyncError(controller.getAll)
);

/**
 * @swagger
 * /users/page/{page}/{pageSize}:
 *  get:
 *    tags:
 *      - User
 *    security:
 *      - JWTAuth: []
 *    description: Return list of users by page
 *    parameters:
 *      - name: page
 *        in: path
 *        required: true
 *        type: integer
 *        description: Page to display
 *      - name: pageSize
 *        in: path
 *        required: true
 *        type: integer
 *        description: Size of page
 *    responses:
 *      "200":
 *        description: List of users
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: number
 *                  nombre:
 *                    type: string
 *                  correo:
 *                    type: string
 *                  password:
 *                    type: string
 *      "401":
 *         description: Credentials are invalid
 *         content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UserForbidden"
 */
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
	Upload.S3('foto'),
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
