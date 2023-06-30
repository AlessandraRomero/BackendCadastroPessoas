import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';

interface IRequest {
  codigoBairro?: number;
  nome?: string;
  status?: number;
}

async function buscarBairroPor(filtros: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro = await bairroRepository.findBy({ ...filtros });
  if (!bairro) {
    return null;
  }
  return bairro;
}
export { buscarBairroPor };
