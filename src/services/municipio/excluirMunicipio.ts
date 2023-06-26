import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';

async function excluirMunicipio(codigoMunicipio: number) {
  const municipioRepository = AppDataSource.getRepository(Municipio);
  const municipio = await municipioRepository.delete({ codigoMunicipio });
  const bairros = await municipioRepository.find();

  if (!municipio.affected) {
    return null;
  }
  return bairros;
}
export { excluirMunicipio };
