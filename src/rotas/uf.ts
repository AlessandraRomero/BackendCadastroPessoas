import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  atualizaUf,
  criarUf,
  excluiUf,
  listarUfs,
} from '../controllers/ufController';
import { validarPost } from '../services/uf/validator';

const ufRouter = Router();

ufRouter.get('/', listarUfs);
ufRouter.post('/', celebrate(validarPost), criarUf);
ufRouter.put('/', atualizaUf);
ufRouter.delete('/:id', excluiUf);

export { ufRouter };
