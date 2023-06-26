import { Router } from 'express';
import {
  atualizaBairro,
  criarBairro,
  excluiBairro,
  listaBairroPorId,
  listarBairros,
} from '../controllers/bairroController';

const bairroRouter = Router();

bairroRouter.get('/bairros', listarBairros);
bairroRouter.get('/bairro/:id', listaBairroPorId);
bairroRouter.post('/bairro', criarBairro);
bairroRouter.put('/bairro/:id', atualizaBairro);
bairroRouter.delete('/bairro/:id', excluiBairro);

export { bairroRouter };
