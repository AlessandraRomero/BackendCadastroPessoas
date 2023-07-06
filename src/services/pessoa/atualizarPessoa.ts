import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';
import { buscarPessoas } from './buscarPessoas';

interface IDadosPessoa {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
  enderecos: {
    codigoEndereco: number;
    nomeRua: string;
    numero: string;
    complemento: string;
    cep: string;
    codigoPessoa: Pessoa;
    codigoBairro: Bairro;
  }[];
}
async function atualizarPessoa(pessoa: IDadosPessoa) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const enderecoRepository = AppDataSource.getRepository(Endereco);

  const pessoaExiste = await pessoaRepository.findOne({
    where: { codigoPessoa: pessoa.codigoPessoa },
    relations: ['enderecos'],
  });

  if (!pessoaExiste) {
    return null;
  }
  pessoaExiste.nome = pessoa.nome;
  pessoaExiste.sobrenome = pessoa.sobrenome;
  pessoaExiste.idade = pessoa.idade;
  pessoaExiste.login = pessoa.login;
  pessoaExiste.senha = pessoa.senha;
  pessoaExiste.status = pessoa.status;

  await pessoaRepository.save(pessoaExiste);

  for (const enderecoExistente of pessoaExiste.enderecos) {
    const enderecoCorrespondente = pessoa.enderecos.find(
      endereco => endereco.codigoEndereco === enderecoExistente.codigoEndereco,
    );

    if (enderecoCorrespondente) {
      enderecoExistente.nomeRua = enderecoCorrespondente.nomeRua;
      enderecoExistente.numero = enderecoCorrespondente.numero;
      enderecoExistente.complemento = enderecoCorrespondente.complemento;
      enderecoExistente.cep = enderecoCorrespondente.cep;
      enderecoExistente.codigoPessoa = enderecoCorrespondente.codigoPessoa;
      enderecoExistente.codigoBairro = enderecoCorrespondente.codigoBairro;

      await enderecoRepository.save(enderecoExistente);
    } else {
      await enderecoRepository.remove(enderecoExistente);
    }
  }

  pessoa.enderecos.forEach(async endereco => {
    if (!endereco.codigoEndereco) {
      const novoEndereco = enderecoRepository.create(endereco);
      novoEndereco.codigoPessoa = pessoaExiste;
      pessoaExiste.enderecos.push(novoEndereco);

      await enderecoRepository.save(novoEndereco);
    }
  });
  const pessoas = await buscarPessoas();

  return pessoas;
}
export { atualizarPessoa };
