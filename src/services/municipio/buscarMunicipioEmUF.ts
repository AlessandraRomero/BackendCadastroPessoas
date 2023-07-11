import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';

async function buscarMunicipioEmUF(nome: string, codigoUF: number) {
  const municipioRepository = AppDataSource.getRepository(Municipio);

  const municipioExistente = await municipioRepository
    .createQueryBuilder('municipio')
    .where('municipio.nome = :nome', { nome })
    .andWhere('municipio.codigoUF = :codigoUF', { codigoUF })
    .getOne();

  return municipioExistente;
}
export { buscarMunicipioEmUF };
