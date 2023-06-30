import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';

async function buscarBairros() {
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
export { buscarBairros };
