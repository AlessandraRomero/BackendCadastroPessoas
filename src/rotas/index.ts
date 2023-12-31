import { Router } from 'express';
import { bairroRouter } from './bairro';
import { municipioRouter } from './municipio';
import { pessoasRouter } from './pessoa';
import { ufRouter } from './uf';

const rotas = Router();

rotas.use('/pessoa', pessoasRouter);
rotas.use('/bairro', bairroRouter);
rotas.use('/municipio', municipioRouter);
rotas.use('/uf', ufRouter);

export { rotas };
