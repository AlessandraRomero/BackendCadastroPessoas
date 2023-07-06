import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  atualizaPessoa,
  criarPessoa,
  excluiPessoa,
  listarPessoas,
} from '../controllers/pessoaController';
import {
  validarGet,
  validarPost,
  validarPut,
} from '../services/pessoa/validator';

const pessoasRouter = Router();

pessoasRouter.get('/', celebrate(validarGet), listarPessoas);
pessoasRouter.post('/', celebrate(validarPost), criarPessoa);
pessoasRouter.put('/', celebrate(validarPut), atualizaPessoa);
pessoasRouter.delete('/:id', excluiPessoa);

export { pessoasRouter };
