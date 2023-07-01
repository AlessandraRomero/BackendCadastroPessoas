import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';
import AppError from '../../erros/AppError';

async function buscarPessoaPor(codigoPessoa: number) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoa = await pessoaRepository.findOneBy({ codigoPessoa });
  if (!pessoa) {
    throw new AppError('Pessoa não encontrada');
  }
  return pessoa;
}
export { buscarPessoaPor };
