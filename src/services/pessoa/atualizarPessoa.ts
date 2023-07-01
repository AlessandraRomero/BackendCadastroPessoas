import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}
async function atualizarPessoa(pessoa: IRequest) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoaExiste = await pessoaRepository.findOneBy({
    codigoPessoa: pessoa.codigoPessoa,
  });

  if (pessoaExiste === null) {
    return null;
  }
  pessoaExiste.nome = pessoa.nome;
  pessoaExiste.sobrenome = pessoa.sobrenome;
  pessoaExiste.idade = pessoa.idade;
  pessoaExiste.login = pessoa.login;
  pessoaExiste.senha = pessoa.senha;
  pessoaExiste.status = pessoa.status;
  return pessoaRepository.save(pessoaExiste);
}
export { atualizarPessoa };
