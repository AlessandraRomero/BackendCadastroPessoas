import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';

async function buscarMunicipios() {
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
    .getMany();

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
export { buscarMunicipios };
