import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoUF?: number;
  sigla?: string;
  nome?: string;
  status?: number;
}
async function buscarUfPor(filtros: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const uf = await ufRepository.findBy({ ...filtros });
  if (!uf.length) {
    return null;
  }
  return uf;
}
export { buscarUfPor };
