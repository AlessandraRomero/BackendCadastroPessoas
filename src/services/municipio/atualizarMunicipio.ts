import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
  codigoUF: Uf;
}
async function atualizarMunicipio(municipioDados: IRequest) {
  const municipioRepository = AppDataSource.getRepository(Municipio);

  const municipioExiste = await municipioRepository
    .createQueryBuilder('municipio')
    .innerJoinAndSelect('municipio.codigoUF', 'uf')
    .where({ codigoMunicipio: municipioDados.codigoMunicipio })
    .getOne();

  if (!municipioExiste) {
    return null;
  }

  municipioExiste.nome = municipioDados.nome;
  municipioExiste.status = municipioDados.status;
  municipioExiste.codigoUF = municipioDados.codigoUF;

  await municipioRepository.save(municipioExiste);

  return municipioExiste;
}
export { atualizarMunicipio };
