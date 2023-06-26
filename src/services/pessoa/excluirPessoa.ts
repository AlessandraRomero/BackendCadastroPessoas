import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

async function excluirPessoa(codigoPessoa: number) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoa = await pessoaRepository.delete({ codigoPessoa });
  const pessoas = await pessoaRepository.find();

  if (!pessoa.affected) {
    return null;
  }
  return pessoas;
}
export { excluirPessoa };
