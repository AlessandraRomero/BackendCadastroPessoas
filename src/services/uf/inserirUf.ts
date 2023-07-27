import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';
import { verificarUfExistente } from './verificarUfExistente';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

async function inserirUf(ufDados: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const { sigla, nome }: IRequest = ufDados;
  const ufExiste = await verificarUfExistente(sigla, nome);

  if (ufExiste) {
    return null;
  }
  return ufRepository.save(ufDados);
}
export { inserirUf };
