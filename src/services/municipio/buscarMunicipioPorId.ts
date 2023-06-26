import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import AppError from '../../erros/AppError';

async function buscarMunicipioPorId(codigoMunicipio: number) {
  const municipioRepository = AppDataSource.getRepository(Municipio);
  const municipio = await municipioRepository.findOneBy({ codigoMunicipio });
  if (!municipio) {
    throw new AppError('municipio não encontrada');
  }
  return municipio;
}
export { buscarMunicipioPorId };
