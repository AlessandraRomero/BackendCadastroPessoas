import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';

async function buscarBairros() {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro = await bairroRepository.find();
  return bairro;
}
export { buscarBairros };
