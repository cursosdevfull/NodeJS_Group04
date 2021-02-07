import express from 'express';
import { router as RouterMedic } from './medicos/infraestructura/medico.route';
import { router as RouterUser } from './usuarios/infraestructura/usuario.route';
import { router as RouterDriver } from './pilotos/infraestructura/piloto.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/medics', RouterMedic);
app.use('/users', RouterUser);
app.use('/drivers', RouterDriver);

export default app;
