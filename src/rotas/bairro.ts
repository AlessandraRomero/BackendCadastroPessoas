import { Router } from 'express';
import {
  atualizaBairro,
  criarBairro,
  excluiBairro,
  listarBairros,
} from '../controllers/bairroController';

const bairroRouter = Router();

bairroRouter.get('/', listarBairros);
bairroRouter.post('/', criarBairro);
bairroRouter.put('/:id', atualizaBairro);
bairroRouter.delete('/:id', excluiBairro);

export { bairroRouter };
