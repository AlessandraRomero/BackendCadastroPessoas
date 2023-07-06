import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';

async function buscarBairroEmMunicipio(nome: string, codigoMunicipio: number) {
  const bairroRepository = AppDataSource.getRepository(Bairro);

  const bairroExistente = await bairroRepository
    .createQueryBuilder('bairro')
    .where('bairro.nome = :nome', { nome })
    .andWhere('bairro.codigoMunicipio = :codigoMunicipio', { codigoMunicipio })
    .getOne();

  return bairroExistente;
}
export { buscarBairroEmMunicipio };
