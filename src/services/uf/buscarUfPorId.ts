import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';
import AppError from '../../erros/AppError';

interface IRequest {
  codigoUF?: number;
  sigla?: string;
  nome?: string;
  status?: number;
}
async function buscarUfPor(filtros: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const uf = await ufRepository.findOneBy({ ...filtros });
  if (!uf) {
    throw new AppError('UF não encontrada');
  }
  return uf;
}
export { buscarUfPor };
