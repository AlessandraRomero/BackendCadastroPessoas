import { Router } from 'express';
import {
  atualizaUf,
  criarUf,
  excluiUf,
  listaUfPor,
  listarUfs,
} from '../controllers/ufController';

const ufRouter = Router();

ufRouter.get('/uf', listarUfs);
ufRouter.get('/uf', listaUfPor);
ufRouter.post('/uf', criarUf);
ufRouter.put('/uf', atualizaUf);
ufRouter.delete('/uf/:id', excluiUf);

export { ufRouter };
