import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import { buscarMunicipios } from './buscarMunicipios';

async function excluirMunicipio(codigoMunicipio: number) {
  const municipioRepository = AppDataSource.getRepository(Municipio);
  const municipio = await municipioRepository.delete({ codigoMunicipio });
  const municipios = await buscarMunicipios();

  if (!municipio.affected) {
    return null;
  }
  return municipios;
}
export { excluirMunicipio };
