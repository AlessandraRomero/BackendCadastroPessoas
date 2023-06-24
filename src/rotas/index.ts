import { Router } from 'express';
import { pessoasRouter } from './pessoa';

const rotas = Router();

rotas.use(pessoasRouter);

export { rotas };
