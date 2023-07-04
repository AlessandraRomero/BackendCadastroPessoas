import { AppDataSource } from '../../AppDataSource';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';

export interface IDadosPessoa {
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: Endereco[];
}

async function inserirPessoa(pessoaDados: IDadosPessoa) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const pessoaExistente = await pessoaRepository.findOne({
    where: { login: pessoaDados.login },
  });

  if (pessoaExistente) {
    return null;
  }
  if (pessoaDados.enderecos.length === 0) {
    return null;
  }
  const novaPessoa = pessoaRepository.create(pessoaDados);

  const novosEnderecos = pessoaDados.enderecos.map(endereco =>
    enderecoRepository.create(endereco),
  );
  novaPessoa.enderecos = novosEnderecos;
  await pessoaRepository.save(novaPessoa);

  const pessoasComEnderecos = await pessoaRepository.find({
    relations: ['enderecos'],
  });

  return pessoasComEnderecos;
}
export { inserirPessoa };
