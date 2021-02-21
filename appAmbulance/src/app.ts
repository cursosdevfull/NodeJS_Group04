import express from 'express';
import { router as RouterMedic } from './medicos/infraestructura/medico.route';
import { router as RouterUser } from './usuarios/infraestructura/usuario.route';
import { router as RouterDriver } from './pilotos/infraestructura/piloto.route';
import { router as RouterAuth } from './auth/infraestructura/auth.route';
import { AutenticacionGuard } from './compartido/infraestructura/guards/autenticacion.guard';
import { Errors } from './compartido/infraestructura/errors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/medics', RouterMedic);
app.use('/users', RouterUser);
app.use('/drivers', AutenticacionGuard.canActivate, RouterDriver);
app.use('/auth', RouterAuth);

app.use(Errors.pathNotFoundError);
app.use(Errors.genericError);

export default app;
