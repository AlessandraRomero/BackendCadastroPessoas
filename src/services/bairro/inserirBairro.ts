import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Municipio } from '../../entidades/Municipio';

interface IRequest {
  nome: string;
  status: number;
  municipio: Municipio;
}

async function inserirBairro(bairroDados: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);
  const bairro: IRequest = bairroDados;
  const bairroExiste = await bairroRepository.findOneBy(bairro);

  if (bairroExiste) {
    return null;
  }
  return bairroRepository.save(bairro);
}
export { inserirBairro };
