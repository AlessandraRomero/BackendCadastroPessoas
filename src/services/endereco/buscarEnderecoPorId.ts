import AppError from '../../erros/AppError';
import { AppDataSource } from '../../AppDataSource';
import { Endereco } from '../../entidades/Endereco';

async function buscarEnderecoPorId(codigoEndereco: number) {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const endereco = await enderecoRepository.findOneBy({ codigoEndereco });
  if (!endereco) {
    throw new AppError('Pessoa não encontrada');
  }
  return endereco;
}
export { buscarEnderecoPorId };
