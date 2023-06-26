import { Router } from 'express';
import {
  atualizaEndereco,
  criarEndereco,
  excluiEndereco,
  listaEnderecoPorId,
  listarEnderecos,
} from '../controllers/enderecoController';

const enderecoRouter = Router();

enderecoRouter.get('/enderecos', listarEnderecos);
enderecoRouter.get('/endereco/:id', listaEnderecoPorId);
enderecoRouter.post('/endereco', criarEndereco);
enderecoRouter.put('/endereco/:id', atualizaEndereco);
enderecoRouter.delete('/endereco/:id', excluiEndereco);

export { enderecoRouter };
