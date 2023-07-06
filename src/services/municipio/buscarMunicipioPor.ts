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
  const municipios = await municipioRepository
    .createQueryBuilder('municipio')
    .innerJoin('municipio.codigoUF', 'uf')
    .select([
      'municipio.codigoMunicipio',
      'municipio.nome',
      'municipio.status',
      'uf.codigoUF',
    ])
    .where({ ...filtros })
    .getMany();

  if (!municipios.length) {
    return null;
  }

  const municipiosFiltrados = municipios.map(municipio => {
    return {
      codigoMunicipio: municipio.codigoMunicipio,
      nome: municipio.nome,
      status: municipio.status,
      codigoUF: municipio.codigoUF.codigoUF,
    };
  });

  return municipiosFiltrados;
}
export { buscarMunicipioPor };
