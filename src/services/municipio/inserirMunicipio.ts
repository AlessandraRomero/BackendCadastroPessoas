import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  nome: string;
  status: number;
  codigoUF: Uf;
}

async function inserirMunicipio(municipioDados: IRequest) {
  const municipioRepository = AppDataSource.getRepository(Municipio);
  const municipio: IRequest = municipioDados;
  
  const municipioExiste = await municipioRepository
    .createQueryBuilder("municipio")
    .innerJoinAndSelect("municipio.codigoUF", "uf",
      "uf.codigoUF = :codigoUF", { codigoUF: municipio.codigoUF.codigoUF })
    .where({...municipio})
    .getMany();

  if (municipioExiste.length) {
    return null;
  }
  return municipioRepository.save(municipio);
}
export { inserirMunicipio };
