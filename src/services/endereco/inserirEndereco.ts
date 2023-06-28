import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';

interface IRequest {
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  codigoPessoa: Pessoa;
  codigoBairro: Bairro;
}

async function inserirEndereco(enderecoDados: IRequest) {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const endereco: IRequest = enderecoDados;
  const enderecoExiste = await enderecoRepository.findOneBy(endereco);

  if (enderecoExiste) {
    return null;
  }
  return enderecoRepository.save(endereco);
}
export { inserirEndereco };
