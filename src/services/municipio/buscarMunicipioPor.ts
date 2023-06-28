import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoMunicipio?: number;
  nome?: string;
  status?: number;
  codigoUF?: Uf;
}
async function buscarMunicipioPor(filtros: IRequest) {
  const municipioRepository = AppDataSource.getRepository(Municipio);
  const municipio = await municipioRepository.findBy({ ...filtros });
  if (!municipio) {
    return null;
  }
  return municipio;
}
export { buscarMunicipioPor };
