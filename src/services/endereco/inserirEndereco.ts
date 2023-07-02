import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';

interface IDataEndereco {
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  codigoPessoa: Pessoa;
  codigoBairro: Bairro;
}

async function inserirEndereco(enderecoDados: IDataEndereco) {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const endereco: IDataEndereco = enderecoDados;

  const enderecoExiste = await enderecoRepository
    .createQueryBuilder('endereco')
    .innerJoinAndSelect(
      'endereco.codigoPessoa',
      'pessoa',
      'pessoa.codigoPessoa = :codigoPessoa',
      {
        codigoPessoa: endereco.codigoPessoa.codigoPessoa,
      },
    )
    .innerJoinAndSelect(
      'endereco.codigoBairro',
      'bairro',
      'bairro.codigoBairro =:codigoBairro',
      {
        codigoBairro: endereco.codigoBairro.codigoBairro,
      },
    )
    .where({ ...endereco })
    .getMany();

  if (enderecoExiste.length) {
    return null;
  }
  return enderecoRepository.save(endereco);
}
export { inserirEndereco };
