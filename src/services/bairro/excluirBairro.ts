import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { buscarBairros } from './buscarBairros';

async function excluirBairro(codigoBairro: number) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro = await bairroRepository.delete({ codigoBairro });
  const bairros = await buscarBairros();

  if (!bairro.affected) {
    return null;
  }
  return bairros;
}
export { excluirBairro };
