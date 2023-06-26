import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

async function buscarPessoas() {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoas = await pessoaRepository.find();
  return pessoas;
}
export { buscarPessoas };