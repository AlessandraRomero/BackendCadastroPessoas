import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  atualizaBairro,
  criarBairro,
  excluiBairro,
  listarBairros,
} from '../controllers/bairroController';
import {
  validarGet,
  validarPost,
  validarPut,
} from '../services/bairro/validator';

const bairroRouter = Router();

bairroRouter.get('/', celebrate(validarGet), listarBairros);
bairroRouter.post('/', celebrate(validarPost), criarBairro);
bairroRouter.put('/', celebrate(validarPut), atualizaBairro);
bairroRouter.delete('/:id', excluiBairro);

export { bairroRouter };
