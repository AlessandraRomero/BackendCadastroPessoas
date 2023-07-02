import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

interface IRequest {
  codigoPessoa?: number;
  nome?: string;
  sobrenome?: string;
  idade?: number;
  login?: string;
  senha?: string;
  status?: number;
}

async function buscarPessoaPor(filtros: IRequest) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoa = await pessoaRepository.findBy({ ...filtros });
  if (!pessoa.length) {
    return null;
  }
  return pessoa;
}
export { buscarPessoaPor };
