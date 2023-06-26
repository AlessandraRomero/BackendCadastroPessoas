import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

async function buscarUfs() {
  const ufRepository = AppDataSource.getRepository(Uf);
  const uf = await ufRepository.find();
  return uf;
}
export { buscarUfs };
