import { AppDataSource } from '../../AppDataSource';
import { Endereco } from '../../entidades/Endereco';

async function buscarEnderecos() {
  const enderecoRepository = AppDataSource.getRepository(Endereco);
  const endereco = await enderecoRepository.find();
  return endereco;
}
export { buscarEnderecos };
