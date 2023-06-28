import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoUF?: number;
  sigla: string;
  nome: string;
  status: number;
}

async function inserirUf(ufDados: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const uf: IRequest = ufDados;
  const ufExiste = await ufRepository.findOneBy(uf);

  if (ufExiste) {
    return null;
  }
  return ufRepository.save(uf);
}
export { inserirUf };
