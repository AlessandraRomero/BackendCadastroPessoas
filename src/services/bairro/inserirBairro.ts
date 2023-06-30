import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Municipio } from '../../entidades/Municipio';

interface IRequest {
  nome: string;
  status: number;
  codigoMunicipio: Municipio;
}

async function inserirBairro(bairroDados: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro: IRequest = bairroDados;

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
