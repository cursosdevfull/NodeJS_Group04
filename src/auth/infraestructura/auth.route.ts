import express, { Router } from 'express';
import { Errors } from '../../compartido/infraestructura/errors';
import { UsuarioOperation } from '../../usuarios/infraestructura/usuario.operation';
import { AuthUseCase } from '../aplicacion/auth.usecase';
import { AuthController } from './auth.controller';

const router: Router = express.Router();
const operation = new UsuarioOperation();
const usecase = new AuthUseCase(operation);
const controller = new AuthController(usecase);

/**
 * @swagger
 * /auth/login:
 *  post:
 *   tags:
 *    - Auth
 *   description: Endpoint to authentication of user
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/components/schemas/Login"
 *   responses:
 *    '200':
 *     description: AccessToken and RefreshToken
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         accessToken: string
 *         refreshToken: string
 *        example:
 *         accessToken: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTQ0MzU0ODcsImV4cCI6MTYxNDQzNzI4Nywibm9tYnJlIjoiQW5kcmVhIiwiZW1haWwiOiJhbmRyZWFAY29ycmVvLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiTUVESUMiXX0.wloJnG-lFaq4siHsJW5QRYhwW9gOjDzVGSwJdPpb8sE
 *         refreshToken: 09b3efb3-cd61-4b5c-b626-89b24840da95
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required:
 *     - email
 *     - password
 *    properties:
 *     email:
 *      type: string
 *      description: User's email
 *     password:
 *      type: string
 *      description: User's password
 *    example:
 *     email: "andrea@correo.com"
 *     password: "123"
 */
router.post('/login', Errors.asyncError(controller.login));

/**
 * @swagger
 * /auth/new-access-token:
 *  post:
 *   tags:
 *    - Auth
 *   description: Endpoint to get a new access token
 *   requestBody:
 *    required: true
 *    content:
 *     application/json:
 *      schema:
 *       type: object
 *       properties:
 *        refreshToken:
 *         type: string
 *       example:
 *        refreshToken: 09b3efb3-cd61-4b5c-b626-89b24840da95
 *   responses:
 *    '401':
 *     description: Credentials are invalid
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/components/schemas/UserForbidden"
 *    '200':
 *     description: AccessToken and RefreshToken
 *     content:
 *      application/json:
 *       schema:
 *        type: object
 *        properties:
 *         accessToken:
 *          type: string
 *         refreshToken:
 *          type: string
 *       example:
 *        accessToken: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MTQ0MzU0ODcsImV4cCI6MTYxNDQzNzI4Nywibm9tYnJlIjoiQW5kcmVhIiwiZW1haWwiOiJhbmRyZWFAY29ycmVvLmNvbSIsInJvbGVzIjpbIkFETUlOIiwiTUVESUMiXX0.wloJnG-lFaq4siHsJW5QRYhwW9gOjDzVGSwJdPpb8sE
 *        refreshToken: 09b3efb3-cd61-4b5c-b626-89b24840da95
 * components:
 *  schemas:
 *   Login:
 *    type: object
 *    required:
 *     - email
 *     - password
 *    properties:
 *     email:
 *      type: string
 *      description: User's email
 *     password:
 *      type: string
 *      description: User's password
 *    example:
 *     email: sergio@correo.com
 *     password: 123
 *   UserForbidden:
 *    type: object
 *    properties:
 *     status:
 *      type: number
 *     message:
 *      type: string
 */
router.post(
	'/new-access-token',
	Errors.asyncError(controller.getNewAccessToken)
);

export { router };
