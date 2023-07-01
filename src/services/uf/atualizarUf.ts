import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}
async function atualizarUf(uf: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const ufExiste = await ufRepository.findOneBy({
    codigoUF: uf.codigoUF,
  });

  if (!ufExiste) {
    return null;
  }

  ufExiste.nome = uf.nome;
  ufExiste.sigla = uf.nome;
  ufExiste.status = uf.status;
  await ufRepository.save(ufExiste);
  return ufExiste;
}
export { atualizarUf };
