import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';

interface IRequest {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[{
    codigoBairro: Bairro;
  }];
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
