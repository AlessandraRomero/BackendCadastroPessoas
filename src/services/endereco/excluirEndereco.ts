import { AppDataSource } from '../../AppDataSource';
import { Endereco } from '../../entidades/Endereco';

async function excluirEndereco(codigoEndereco: number) {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const endereco = await enderecoRepository.delete({ codigoEndereco });
  const enderecos = await enderecoRepository.find();

  if (!endereco.affected) {
    return null;
  }
  return enderecos;
}
export { excluirEndereco };
