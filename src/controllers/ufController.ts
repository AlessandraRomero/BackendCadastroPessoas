import { NextFunction, Request, Response } from 'express';
import { excluirBairro } from '../services/bairro/excluirBairro';
import { atualizarUf } from '../services/uf/atualizarUf';
import { buscarUfPor } from '../services/uf/buscarUfPor';
import { buscarUfs } from '../services/uf/buscarUfs';
import { inserirUf } from '../services/uf/inserirUf';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

async function listarUfs(req: Request, res: Response, next: NextFunction) {
  const filtros: IFilter = req.query;
  const ufs = await buscarUfPor(filtros);

  if (ufs) return res.status(200).send(ufs);

  //next(new AppError('Não foi possível consultar UF no banco de dados.', 404));
  return res.status(404).send({
    mensagem: 'Não foi possível consultar UF no banco de dados.',
    status: 404,
  });
}

interface IFilter {
  codigoUF?: number;
  sigla?: string;
  nome?: string;
  status?: number;
}

async function criarUf(req: Request, res: Response) {
  const ufDados: IRequest = req.body;
  const resultado = await inserirUf(ufDados);

  if (resultado) {
    const ufs = await buscarUfs();
    return res.status(200).send(ufs);
  }
  return res.status(404).send({
    mensagem: 'Não foi possível incluir UF no banco de dados.',
    status: 404,
  });
}

async function atualizaUf(req: Request, res: Response) {
  const ufDados: IRequest = req.body;
  const resultado = await atualizarUf(ufDados);

  if (resultado) {
    const ufs = await buscarUfs();
    return res.status(200).send(ufs);
  }
  return res.status(404).send({
    mensagem: 'Não foi possível alterar UF no banco de dados.',
    status: 404,
  });
}

async function excluiUf(req: Request, res: Response) {
  const codigoUF = Number(req.params.id);

  const uf = await excluirBairro(codigoUF);

  if (uf) return res.send(uf);

  return res.status(404).send({
    Mensagem: 'Não foi possível localizar uf',
    status: 404,
  });
}

export { atualizaUf, criarUf, excluiUf, listarUfs };
