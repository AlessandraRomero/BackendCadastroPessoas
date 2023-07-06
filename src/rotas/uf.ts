import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  atualizaUf,
  criarUf,
  excluiUf,
  listarUfs,
} from '../controllers/ufController';
import { validarGet, validarPost, validarPut } from '../services/uf/validator';

const ufRouter = Router();

ufRouter.get('/', celebrate(validarGet), listarUfs);
ufRouter.post('/', celebrate(validarPost), criarUf);
ufRouter.put('/', celebrate(validarPut), atualizaUf);
ufRouter.delete('/:id', excluiUf);

export { ufRouter };
