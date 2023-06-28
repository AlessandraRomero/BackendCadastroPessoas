import { AppDataSource } from '../../AppDataSource';
import { Municipio } from '../../entidades/Municipio';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
  codigoUF: Uf;
}
async function atualizarMunicipio(municipio: IRequest) {
  const municipioRepository = AppDataSource.getRepository(Municipio);

  const municipioExiste = await municipioRepository.findOneBy({
    codigoMunicipio: municipio.codigoMunicipio,
  });

  if (municipioExiste === null) {
    return null;
  }
  municipioExiste.nome = municipio.nome;
  municipioExiste.status = municipio.status;
  municipioExiste.codigoUF = municipio.codigoUF;
  return municipioRepository.save(municipioExiste);
}
export { atualizarMunicipio };
