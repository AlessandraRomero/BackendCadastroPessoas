import { Router } from 'express';
import {
  atualizaPessoa,
  criarPessoa,
  excluiPessoa,
  listarPessoas,
} from '../controllers/pessoaController';

const pessoasRouter = Router();

pessoasRouter.get('/', listarPessoas);
pessoasRouter.post('/', criarPessoa);
pessoasRouter.put('/', atualizaPessoa);
pessoasRouter.delete('/:id', excluiPessoa);

export { pessoasRouter };
