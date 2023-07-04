import { AppDataSource } from '../../AppDataSource';
import { Pessoa } from '../../entidades/Pessoa';

async function buscarPessoas() {
  const pessoaRepository = AppDataSource.getRepository(Pessoa);
  const pessoas = await pessoaRepository.find({
    select: [
      'codigoPessoa',
      'nome',
      'sobrenome',
      'idade',
      'login',
      'senha',
      'status',
    ],
    relations: ['enderecos'],
    join: {
      alias: 'pessoa',
      leftJoinAndSelect: {
        enderecos: 'pessoa.enderecos',
      },
    },
    loadRelationIds: true,
  });

  pessoas.forEach(pessoa => {
    pessoa.enderecos = [];
  });

  return pessoas;
}
export { buscarPessoas };
