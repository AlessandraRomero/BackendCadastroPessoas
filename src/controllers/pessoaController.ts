import { Request, Response } from 'express';
import { atualizarPessoa } from '../services/pessoa/atualizarPessoa';
import { buscarPessoaPor } from '../services/pessoa/buscarPessoaPor';
import { buscarPessoas } from '../services/pessoa/buscarPessoas';
import { excluirPessoa } from '../services/pessoa/excluirPessoa';
import {
  IDadosPessoa as InserirPessoaRequest,
  inserirPessoa,
} from '../services/pessoa/inserirPessoa';

interface IRequest extends InserirPessoaRequest {
  codigoPessoa: number;
}

async function listarPessoas(req: Request, res: Response) {
  const filtros: IFilterPessoa = req.query;
  console.log('filtros : ', filtros);
  const pessoaDetalhes = await buscarPessoaPor(filtros);

  return res.status(200).send(pessoaDetalhes);
}

export interface IFilterPessoa {
  codigoPessoa?: number;
  nome?: string;
  sobrenome?: string;
  idade?: number;
  login?: string;
  senha?: string;
  status?: number;
}

async function criarPessoa(req: Request, res: Response) {
  const pessoaDados: IRequest = {
    ...req.body,
    enderecos: req.body.enderecos || [],
  };
  // console.log('DADOS PESSOA: ', pessoaDados);
  if (pessoaDados.enderecos.length === 0) {
    return res.status(400).send({
      mensagem: 'É necessário fornecer pelo menos um endereço.',
      status: 400,
    });
  }

  const pessoaInserida = await inserirPessoa(pessoaDados);

  if (pessoaInserida) {
    const pessoas = await buscarPessoas();
    return res.status(200).send(pessoas);
  } else {
    return res.status(400).send({
      mensagem: 'Já existe uma pessoa com o mesmo login.',
      status: 400,
    });
  }
}

async function atualizaPessoa(req: Request, res: Response) {
  const pessoaDados: IRequest = {
    codigoPessoa: req.body.codigoPessoa,
    nome: req.body.nome,
    sobrenome: req.body.sobrenome,
    idade: req.body.idade,
    login: req.body.login,
    senha: req.body.senha,
    status: req.body.status,
    enderecos: req.body.enderecos || [],
  };

  const pessoaAtualizada = await atualizarPessoa(pessoaDados);

  console.log(pessoaAtualizada);
  if (pessoaAtualizada) {
    const pessoas = await buscarPessoas();
    return res.status(200).send(pessoas);
  } else {
    return res.status(400).send({
      mensagem: 'Pessoa não encontrada.',
      status: 400,
    });
  }
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

export { atualizaPessoa, criarPessoa, excluiPessoa, listarPessoas };
