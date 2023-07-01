import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Municipio } from '../../entidades/Municipio';

interface IRequest {
  codigoBairro?: number;
  nome?: string;
  status?: number;
  codigoMunicipio?: Municipio;
}

async function buscarBairroPor(filtros: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
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
export { buscarBairroPor };
