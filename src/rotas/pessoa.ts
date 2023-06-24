import {
  atualizaPessoa,
  criarPessoa,
  excluiPessoa,
  listaPessoaPorId,
  listarPessoas,
} from '../controllers/pessoaController';
import { Router } from 'express';

const pessoasRouter = Router();

pessoasRouter.get('/pessoas', listarPessoas);
pessoasRouter.get('/pessoa/:id', listaPessoaPorId);
pessoasRouter.post('/pessoa', criarPessoa);
pessoasRouter.put('/pessoa/:id', atualizaPessoa);
pessoasRouter.delete('/pessoa/:id', excluiPessoa);

export { pessoasRouter };
