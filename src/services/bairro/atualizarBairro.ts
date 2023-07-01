import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Municipio } from '../../entidades/Municipio';

interface IRequest {
  codigoBairro: number;
  nome: string;
  status: number;
  codigoMunicipio: Municipio;
}
async function atualizarBairro(bairroDados: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);

  const bairroExiste = await bairroRepository
    .createQueryBuilder('bairro')
    .innerJoinAndSelect('bairro.codigoMunicipio', 'municipio')
    .where({ codigoBairro: bairroDados.codigoMunicipio })
    .getOne();

  if (!bairroExiste) {
    return null;
  }

  bairroExiste.nome = bairroDados.nome;
  bairroExiste.status = bairroDados.status;
  bairroExiste.codigoMunicipio = bairroDados.codigoMunicipio;

  await bairroRepository.save(bairroExiste);

  return bairroExiste;
}
export { atualizarBairro };
