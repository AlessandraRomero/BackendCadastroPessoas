import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';

async function excluirBairro(codigoBairro: number) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro = await bairroRepository.delete({ codigoBairro });
  const bairros = await bairroRepository.find();

  if (!bairro.affected) {
    return null;
  }
  return bairros;
}
export { excluirBairro };
