import AppError from '../../erros/AppError';
import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

async function buscarPessoaPorId(codigoPessoa: number) {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoa = await pessoaRepository.findOneBy({ codigoPessoa });
  if (!pessoa) {
    throw new AppError('Pessoa não encontrada');
  }
  return pessoa;
}
export { buscarPessoaPorId };
