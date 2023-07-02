import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}
async function atualizarUf(ufDados: IRequest) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const ufExiste = await ufRepository.findOneBy({
    codigoUF: ufDados.codigoUF,
  });

  if (ufExiste === null) {
    return null;
  }
  ufExiste.codigoUF = ufDados.codigoUF;
  ufExiste.sigla = ufDados.sigla;
  ufExiste.nome = ufDados.nome;
  ufExiste.status = ufDados.status;
  return ufRepository.save(ufExiste);
}
export { atualizarUf };
