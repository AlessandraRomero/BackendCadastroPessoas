import { Router } from 'express';
import {
  atualizaUf,
  criarUf,
  excluiUf,
  listaUfPorId,
  listarUfs,
} from '../controllers/ufController';

const ufRouter = Router();

ufRouter.get('/uf', listarUfs);
ufRouter.get('/uf/:id', listaUfPorId);
ufRouter.post('/uf', criarUf);
ufRouter.put('/bairro/:id', atualizaUf);
ufRouter.delete('/bairro/:id', excluiUf);

export { ufRouter };
