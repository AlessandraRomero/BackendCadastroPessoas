import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Uf } from '../../entidades/Uf';

interface IDataBairro {
  codigoBairro: number;
  nome: string;
  status: number;
  codigoMunicipio: {
    codigoMunicipio: number;
    nome?: string;
    status?: number;
    codigo?: Uf;
  };
}
async function atualizarBairro(bairroDados: IDataBairro) {
  const bairroRepository = AppDataSource.getRepository(Bairro);

  const bairroExiste = await bairroRepository
    .createQueryBuilder('bairro')
    .innerJoinAndSelect('bairro.codigoMunicipio', 'municipio')
    .where({ codigoBairro: bairroDados.codigoBairro })
    .getOne();

  if (!bairroExiste) {
    return null;
  }
  const bairroComMesmoNome = await bairroRepository.findOneBy({
    nome: bairroDados.nome,
  });
  if (bairroComMesmoNome) {
    return null;
  }

  bairroExiste.nome = bairroDados.nome;
  bairroExiste.status = bairroDados.status;
  bairroExiste.codigoMunicipio
    ? bairroDados.codigoMunicipio
    : bairroDados.codigoMunicipio;

  await bairroRepository.save(bairroExiste);

  return bairroExiste;
}
export { atualizarBairro };
