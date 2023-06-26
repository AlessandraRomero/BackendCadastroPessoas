import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import AppError from '../../erros/AppError';

async function buscarBairroPorId(codigoBairro: number) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro = await bairroRepository.findOneBy({ codigoBairro });
  if (!bairro) {
    throw new AppError('Bairro não encontrada');
  }
  return bairro;
}
export { buscarBairroPorId };
