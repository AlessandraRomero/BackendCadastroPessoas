import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  atualizaUf,
  criarUf,
  excluiUf,
  listarUfs,
} from '../controllers/ufController';
import { validarPost, validarPut } from '../services/uf/validator';

const ufRouter = Router();

ufRouter.get('/', listarUfs);
ufRouter.post('/', celebrate(validarPost), criarUf);
ufRouter.put('/', celebrate(validarPut), atualizaUf);
ufRouter.delete('/:id', excluiUf);

export { ufRouter };
