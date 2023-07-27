import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';
import { verificarUfExistente } from './verificarUfExistente';

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

  if (!ufExiste) {
    return null;
  }

  // Verificar se já existe outra UF com a mesma sigla ou nome
  const ufComMesmaSiglaOuNome = await verificarUfExistente(
    ufDados.sigla,
    ufDados.nome,
  );

  if (ufComMesmaSiglaOuNome) {
    return null; // Se já existe outra UF com a mesma sigla ou nome, retornar null
  }

  ufExiste.codigoUF = ufDados.codigoUF;
  ufExiste.sigla = ufDados.sigla;
  ufExiste.nome = ufDados.nome;
  ufExiste.status = ufDados.status;
  return ufRepository.save(ufExiste);
}
export { atualizarUf };
