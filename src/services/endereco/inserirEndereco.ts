import AppError from '../../erros/AppError';
import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';
import { Bairro } from '../../entidades/Bairro';
import { Endereco } from '../../entidades/Endereco';

interface IRequest {
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  pessoa: Pessoa;
  bairro: Bairro;
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
