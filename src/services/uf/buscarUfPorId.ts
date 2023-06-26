import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';
import AppError from '../../erros/AppError';

async function buscarUfPorId(codigoUF: number) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const uf = await ufRepository.findOneBy({ codigoUF });
  if (!uf) {
    throw new AppError('UF não encontrada');
  }
  return uf;
}
export { buscarUfPorId };
