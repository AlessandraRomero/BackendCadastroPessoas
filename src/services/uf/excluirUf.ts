import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

async function excluirUf(codigoUF: number) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const uf = await ufRepository.delete({ codigoUF });
  const ufs = await ufRepository.find();

  if (!uf.affected) {
    return null;
  }
  return ufs;
}
export { excluirUf };
