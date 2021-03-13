import express from 'express';
import { router as RouterMedic } from './medicos/infraestructura/medico.route';
import { router as RouterUser } from './usuarios/infraestructura/usuario.route';
import { router as RouterDriver } from './pilotos/infraestructura/piloto.route';
import { router as RouterAuth } from './auth/infraestructura/auth.route';
import { AutenticacionGuard } from './compartido/infraestructura/guards/autenticacion.guard';
import { Errors } from './compartido/infraestructura/errors';
import helmet from 'helmet';
import multer from 'multer';
import cors from 'cors';

import swaggerUI from 'swagger-ui-express';
import swaggerJsdoc = require('swagger-jsdoc');
// import swaggerConfig from './common/config/swagger.config.json';

const swaggerConfig = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'API Ambulance',
			version: '1.0.0',
			description: 'Information about API and endpoints',
			contact: {
				name: 'Sergio Hidalgo',
				url: 'https://cursos-dev.com',
				email: 'sergiohidalgocaceres@gmail.com',
			},
			license: {
				name: 'MIT',
				url: 'https://spdx.org/licenses/MIT.html',
			},
		},
		components: {
			securitySchemes: {
				JWTAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [
			{
				JWTAuth: [''],
			},
		],
		servers: [
			{
				url: 'http://localhost:3000',
				description: 'Development Server',
			},
			{
				url: 'http://256489656656.aws.amazon.com',
				description: 'Production Server',
			},
		],
	},
	apis: ['**/infraestructura/*.route.ts'],
};

multer();
const swaggerDocs = swaggerJsdoc(swaggerConfig);

const app = express();
app.use(cors());
app.use(helmet());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	'/docs',
	swaggerUI.serve,
	swaggerUI.setup(swaggerDocs, { explorer: true })
);

app.use('/medics', RouterMedic);
app.use('/users', RouterUser);
app.use('/drivers', AutenticacionGuard.canActivate, RouterDriver);
app.use('/auth', RouterAuth);

app.get('/health', (req, res) => res.send('I am alive'));

app.use(Errors.pathNotFoundError);
app.use(Errors.genericError);

export default app;
