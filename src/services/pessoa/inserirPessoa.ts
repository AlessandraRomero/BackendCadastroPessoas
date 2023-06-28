import { AppDataSource } from '../../AppDataSource';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

async function inserirPessoa(pessoaDados: IRequest) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoa: IRequest = pessoaDados;
  const pessoaExiste = await pessoaRepository.findOneBy(pessoa);

  if (pessoaExiste) {
    return null;
  }
  return pessoaRepository.save(pessoa);
}
export { inserirPessoa };
