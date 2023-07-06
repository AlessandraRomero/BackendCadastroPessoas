import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';

async function buscarMunicipioEmUF(nome: string, codigoUF: number) {
  const bairroRepository = AppDataSource.getRepository(Municipio);

  const bairroExistente = await bairroRepository
    .createQueryBuilder('municipio')
    .where('municipio.nome = :nome', { nome })
    .andWhere('municipio.codigoUF = :codigoUF', { codigoUF })
    .getOne();

  return bairroExistente;
}
export { buscarMunicipioEmUF };
