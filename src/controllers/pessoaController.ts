import { atualizarPessoa } from '../services/pessoa/atualizarPessoa';
import { buscarPessoaPorId } from '../services/pessoa/buscarPessoaPorId';
import { buscarPessoas } from '../services/pessoa/buscarPessoas';
import { excluirPessoa } from '../services/pessoa/excluirPessoa';
import { inserirPessoa } from '../services/pessoa/inserirPessoa';
import { Request, Response } from 'express';

interface IRequest {
  codigoPessoa: number;
  nome: string;
  sobrenome: string;
  idade: number;
  login: string;
  senha: string;
  status: number;
}

async function listarPessoas(req: Request, res: Response) {
  const pessoas = await buscarPessoas();

  if (pessoas) return res.status(200).send(pessoas);

  return res.status(404).send({
    status: 404,
    menssagem: 'Não foi possível encontrar todos os clientes',
  });
}

async function listaPessoaPorId(req: Request, res: Response) {
  const codigoPessoa = Number(req.params.id);

  const pessoa = await buscarPessoaPorId(codigoPessoa);

  if (pessoa) return res.send(pessoa);

  return res.status(404).send({
    Error: 'Não foi possíve encontrar pessoa por id',
    status: 404,
  });
}

async function criarPessoa(req: Request, res: Response) {
  const pessoaDados: IRequest = req.body;
  const resultado = await inserirPessoa(pessoaDados);

  if (resultado) {
    const pessoas = await buscarPessoas();
    return res.status(200).send(pessoas);
  }
  return res.status(404).send({});
}

async function atualizaPessoa(req: Request, res: Response) {
  const pessoaDados: IRequest = req.body;
  pessoaDados.codigoPessoa = Number(req.params.id);
  const resultado = await atualizarPessoa(pessoaDados);

  if (resultado) return res.send('pessoa atualizada');

  return res.status(404).send('Erro ao atualizar');
}

async function excluiPessoa(req: Request, res: Response) {
  const codigoPessoa = Number(req.params.id);

  const pessoa = await excluirPessoa(codigoPessoa);

  if (pessoa) return res.send(pessoa);

  return res.status(404).send({
    Mensagem: 'Não foi possível localizar pessoa',
    status: 404,
  });
}

export {
  listarPessoas,
  listaPessoaPorId,
  criarPessoa,
  atualizaPessoa,
  excluiPessoa,
};
