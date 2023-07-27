import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Municipio } from '../../entidades/Municipio';

interface IRequest {
  codigoBairro?: number;
  nome?: string;
  status?: number;
  codigoMunicipio?: Municipio;
}

async function filtrosBairro(filtros: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  // Verificar se o filtro contém apenas o codigoBairro
  const filtroApenasCodigoBairro =
    Object.keys(filtros).length === 1 && 'codigoBairro' in filtros;

  if (filtroApenasCodigoBairro) {
    const bairroEncontrado = await bairroRepository.findOne({
      where: filtros,
      relations: ['codigoMunicipio'],
    });
    if (!bairroEncontrado) {
      return [];
    }
    return {
      codigoBairro: bairroEncontrado.codigoBairro,
      nome: bairroEncontrado.nome,
      status: bairroEncontrado.status,
      codigoMunicipio: bairroEncontrado.codigoMunicipio.codigoMunicipio,
    };
  }
  const filtroCodigoBairroEMunicipio =
    'codigoBairro' in filtros && 'codigoMunicipio' in filtros;

  // Verificar se o filtro contém o codigoBairro e o codigoMunicipio
  if (filtroCodigoBairroEMunicipio) {
    const bairroEncontrado = await bairroRepository.findOne({
      where: {
        codigoBairro: filtros.codigoBairro,
        codigoMunicipio: filtros.codigoMunicipio,
      },
      relations: ['codigoMunicipio'],
    });

    if (!bairroEncontrado) {
      return [];
    }

    return {
      codigoBairro: bairroEncontrado.codigoBairro,
      nome: bairroEncontrado.nome,
      status: bairroEncontrado.status,
      codigoMunicipio: bairroEncontrado.codigoMunicipio.codigoMunicipio,
    };
  }

  const bairros = await bairroRepository
    .createQueryBuilder('bairro')
    .innerJoin('bairro.codigoMunicipio', 'municipio')
    .select([
      'bairro.codigoBairro',
      'bairro.nome',
      'bairro.status',
      'municipio.codigoMunicipio',
    ])
    .where(filtros)
    .getMany();

  const bairrosFiltrados = bairros.map(bairro => {
    return {
      codigoBairro: bairro.codigoBairro,
      nome: bairro.nome,
      status: bairro.status,
      codigoMunicipio: bairro.codigoMunicipio.codigoMunicipio,
    };
  });
  return bairrosFiltrados;
}
export { filtrosBairro };
