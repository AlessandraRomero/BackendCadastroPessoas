import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Municipio } from '../../entidades/Municipio';

interface IRequest {
  codigoBairro: number;
  nome: string;
  status: number;
  codigoMunicipio: Municipio;
}
async function atualizarBairro(bairro: IRequest) {
  const bairroRepository = AppDataSource.getRepository(Bairro);

  const bairroExiste = await bairroRepository.findOneBy({
    codigoBairro: bairro.codigoBairro,
  });

  if (bairroExiste === null) {
    return null;
  }
  bairroExiste.nome = bairro.nome;
  bairroExiste.status = bairro.status;
  bairroExiste.codigoMunicipio = bairro.codigoMunicipio;
  return bairroRepository.save(bairroExiste);
}
export { atualizarBairro };
