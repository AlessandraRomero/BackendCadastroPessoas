import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import { Uf } from '../../entidades/Uf';

export interface IRequest {
  codigoMunicipio?: number;
  nome?: string;
  status?: number;
  codigoUF?: Uf;
}

async function filtrosMunicipio(filtros: IRequest) {
  const municipioRepository = AppDataSource.getRepository(Municipio);

  // Verificar se o filtro contém apenas o codigoMunicipio
  const filtroApenasCodigoMunicipio =
    Object.keys(filtros).length === 1 && 'codigoMunicipio' in filtros;

  if (filtroApenasCodigoMunicipio) {
    const municipioEncontrado = await municipioRepository.findOne({
      where: filtros,
      relations: ['codigoUF'],
    });

    if (!municipioEncontrado) {
      return [];
    }

    return {
      codigoMunicipio: municipioEncontrado.codigoMunicipio,
      nome: municipioEncontrado.nome,
      status: municipioEncontrado.status,
      codigoUF: municipioEncontrado.codigoUF.codigoUF,
    };
  }

  // Caso não seja apenas o codigoMunicipio no filtro, realizar a consulta normalmente
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
    return [];
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

export { filtrosMunicipio };
