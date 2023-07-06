import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

interface IFilterPessoa {
  codigoPessoa?: number;
  nome?: string;
  sobrenome?: string;
  idade?: number;
  login?: string;
  senha?: string;
  status?: number;
  enderecos?: Endereco[];
}

interface Endereco {
  codigoEndereco: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  codigoPessoa: number;
  codigoBairro: number;
  bairro: {
    codigoBairro: number;
    nome: string;
    status: number;
    municipio: {
      codigoMunicipio: number;
      nome: string;
      status: number;
      uf: {
        codigoUF: number;
        sigla: string;
        nome: string;
        status: number;
      };
    };
  };
}

async function buscarPessoaPor(filtros: IFilterPessoa) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoas = await pessoaRepository
    .createQueryBuilder('pessoa')
    .leftJoinAndSelect('pessoa.enderecos', 'endereco')
    .leftJoinAndSelect('endereco.codigoBairro', 'bairro')
    .leftJoinAndSelect('bairro.codigoMunicipio', 'municipio')
    .leftJoinAndSelect('municipio.codigoUF', 'uf')
    .where(filtros)
    .getMany();

  if (!pessoas) {
    // retornar array vazio
    return [];
  }
  console.log('PESSOAS: ', pessoas);
  const pessoasFiltradas = pessoas.map(pessoa => {
    if (filtros.codigoPessoa) {
      return {
        codigoPessoa: pessoa.codigoPessoa,
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        idade: pessoa.idade,
        login: pessoa.login,
        senha: pessoa.senha,
        status: pessoa.status,
        enderecos: pessoa.enderecos.map(endereco => ({
          codigoEndereco: endereco.codigoEndereco,
          nomeRua: endereco.nomeRua,
          numero: endereco.numero,
          complemento: endereco.complemento,
          cep: endereco.cep,
          codigoPessoa: pessoa.codigoPessoa,
          codigoBairro: endereco.codigoBairro.codigoBairro,
          bairro: {
            codigoBairro: endereco.codigoBairro.codigoBairro,
            nome: endereco.codigoBairro.nome,
            status: endereco.codigoBairro.status,
            codigoMunicipio:
              endereco.codigoBairro.codigoMunicipio.codigoMunicipio,
            municipio: {
              codigoMunicipio:
                endereco.codigoBairro.codigoMunicipio.codigoMunicipio,
              nome: endereco.codigoBairro.codigoMunicipio.nome,
              status: endereco.codigoBairro.codigoMunicipio.status,
              codigoUF: endereco.codigoBairro.codigoMunicipio.codigoUF.codigoUF,
              uf: {
                codigoUF:
                  endereco.codigoBairro.codigoMunicipio.codigoUF.codigoUF,
                sigla: endereco.codigoBairro.codigoMunicipio.codigoUF.sigla,
                nome: endereco.codigoBairro.codigoMunicipio.codigoUF.nome,
                status: endereco.codigoBairro.codigoMunicipio.codigoUF.status,
              },
            },
          },
        })),
      };
    } else {
      return {
        codigoPessoa: pessoa.codigoPessoa,
        nome: pessoa.nome,
        sobrenome: pessoa.sobrenome,
        idade: pessoa.idade,
        login: pessoa.login,
        senha: pessoa.senha,
        status: pessoa.status,
        enderecos: [],
      };
    }
  });
  return pessoasFiltradas;
}
export { buscarPessoaPor };
