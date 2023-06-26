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

  if (ufExiste === null) {
    return null;
  }
  ufExiste.nome = uf.nome;
  ufExiste.sigla = uf.nome;
  ufExiste.status = uf.status;
  return ufRepository.save(ufExiste);
}
export { atualizarUf };
