import { Router } from 'express';
import {
  atualizaUf,
  criarUf,
  excluiUf,
  listarUfs,
} from '../controllers/ufController';

const ufRouter = Router();

ufRouter.get('/', listarUfs);
ufRouter.post('/', criarUf);
ufRouter.put('/', atualizaUf);
ufRouter.delete('/:id', excluiUf);

export { ufRouter };
