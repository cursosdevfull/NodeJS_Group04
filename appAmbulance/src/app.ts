import express from 'express';
import { router as RouterMedic } from './medicos/infraestructura/medico.route';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/medics', RouterMedic);

export default app;
