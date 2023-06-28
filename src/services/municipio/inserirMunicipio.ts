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
  const municipioExiste = await municipioRepository.findOneBy(municipio);

  if (municipioExiste) {
    return null;
  }
  return municipioRepository.save(municipio);
}
export { inserirMunicipio };
