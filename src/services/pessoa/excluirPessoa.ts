import AppError from '../../erros/AppError';
import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

async function excluirPessoa(codigoPessoa: number) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoa = await pessoaRepository.delete({ codigoPessoa });
  if (!pessoa) {
    throw new AppError('Pessoa não localizada');
    return;
  }
  return pessoa;
}
export { excluirPessoa };
