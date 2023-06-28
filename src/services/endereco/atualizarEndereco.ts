import { AppDataSource } from '../../AppDataSource';
import { Bairro } from '../../entidades/Bairro';
import { Endereco } from '../../entidades/Endereco';
import { Pessoa } from '../../entidades/Pessoa';

interface IRequest {
  codigoEndereco: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  codigoPessoa: Pessoa;
  codigoBairro: Bairro;
}
async function atualizarEndereco(endereco: IRequest) {
  const enderecoRepository = AppDataSource.getRepository(Endereco);

  const enderecoExiste = await enderecoRepository.findOneBy({
    codigoEndereco: endereco.codigoEndereco,
  });

  if (enderecoExiste === null) {
    return null;
  }
  enderecoExiste.nomeRua = endereco.nomeRua;
  enderecoExiste.numero = endereco.numero;
  enderecoExiste.complemento = endereco.complemento;
  enderecoExiste.cep = endereco.cep;
  enderecoExiste.codigoPessoa = endereco.codigoPessoa;
  enderecoExiste.codigoBairro = endereco.codigoBairro;
  return enderecoRepository.save(enderecoExiste);
}
export { atualizarEndereco };
