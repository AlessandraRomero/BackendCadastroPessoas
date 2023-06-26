import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';

async function buscarMunicipios() {
  const municipioRepository = AppDataSource.getRepository(Municipio);
  const municipio = await municipioRepository.find();
  return municipio;
}
export { buscarMunicipios };
