import { AppDataSource } from '../../AppDataSource';
import { Uf } from '../../entidades/Uf';

async function verificarUfExistente(sigla: string, nome: string) {
  const ufRepository = AppDataSource.getRepository(Uf);
  const ufPorSigla = await ufRepository.findOneBy({ sigla });
  const ufPorNome = await ufRepository.findOneBy({ nome });

  if (ufPorSigla || ufPorNome) {
    return true; // Retorna true se já existir uma UF com a mesma sigla ou nome
  }

  return false; // Retorna false se não existir uma UF com a mesma sigla ou nome
}

export { verificarUfExistente };
