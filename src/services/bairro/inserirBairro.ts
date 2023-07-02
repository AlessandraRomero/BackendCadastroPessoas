import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';

interface IDataBairro {
  nome: string;
  status: number;
  codigoMunicipio: {
    codigoMunicipio: number;
  };
}

async function inserirBairro(bairroDados: IDataBairro) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro: IDataBairro = bairroDados;

  const bairroExiste = await bairroRepository
    .createQueryBuilder('bairro')
    .innerJoinAndSelect(
      'bairro.codigoMunicipio',
      'municipio',
      'municipio.codigoMunicipio = :codigoMunicipio',
      { codigoMunicipio: bairro.codigoMunicipio.codigoMunicipio },
    )
    .where({ ...bairro })
    .getMany();

  if (bairroExiste.length) {
    return null;
  }
  return bairroRepository.save(bairro);
}
export { inserirBairro };
