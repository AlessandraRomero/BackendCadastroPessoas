import { NextFunction, Request, Response } from 'express';
import { atualizarUf } from '../services/uf/atualizarUf';
import { buscarUfs } from '../services/uf/buscarUfs';
import { excluirUf } from '../services/uf/excluirUf';
import { filtrosUf } from '../services/uf/ffltrosUf';
import { inserirUf } from '../services/uf/inserirUf';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

async function listarUfs(req: Request, res: Response, next: NextFunction) {
  const filtros: IFilter = req.query;
  const ufs = await filtrosUf(filtros);

  if (ufs) return res.status(200).send(ufs);

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
  const ufFoiInserida = await inserirUf(ufDados);
  if (!ufFoiInserida) {
    return res.status(400).send({
      mensagem: 'Já existe uma UF com o mesmo nome ou sigla',
      status: 400,
    });
  }
  const ufs = await buscarUfs();
  return res.status(200).send(ufs);
}

async function atualizaUf(req: Request, res: Response) {
  const ufDados: IRequest = req.body;
  const ufAtualizada = await atualizarUf(ufDados);

  if (!ufAtualizada) {
    return res.status(400).send({
      mensagem:
        'UF não encontrada ou já existe outra UF com a mesma sigla ou nome',
      status: 400,
    });
  }

  const ufs = await buscarUfs();
  return res.status(200).send(ufs);
}

async function excluiUf(req: Request, res: Response) {
  const codigoUF = Number(req.params.id);

  const uf = await excluirUf(codigoUF);

  if (uf) return res.send(uf);

  return res.status(404).send({
    Mensagem: 'Não foi possível localizar uf',
    status: 404,
  });
}

export { atualizaUf, criarUf, excluiUf, listarUfs };
