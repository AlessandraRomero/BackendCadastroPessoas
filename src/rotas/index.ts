import { Router } from 'express';
import { bairroRouter } from './bairro';
import { enderecoRouter } from './endereco';
import { municipioRouter } from './municipio';
import { pessoasRouter } from './pessoa';
import { ufRouter } from './uf';

const rotas = Router();

rotas.use(pessoasRouter);
rotas.use(enderecoRouter);
rotas.use(bairroRouter);
rotas.use(municipioRouter);
rotas.use(ufRouter);

export { rotas };
