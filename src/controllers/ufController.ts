import { Request, Response } from 'express';
import { excluirBairro } from '../services/bairro/excluirBairro';
import { atualizarUf } from '../services/uf/atualizarUf';
import { buscarUfPorId } from '../services/uf/buscarUfPorId';
import { buscarUfs } from '../services/uf/buscarUfs';
import { inserirUf } from '../services/uf/inserirUf';

interface IRequest {
  codigoUF: number;
  sigla: string;
  nome: string;
  status: number;
}

async function listarUfs(req: Request, res: Response) {
  const ufs = await buscarUfs();

  if (ufs) return res.status(200).send(ufs);

  return res.status(404).send({
    mensagem: 'Não foi possível encontrar todos os ufs',
    status: 404,
  });
}

async function listaUfPorId(req: Request, res: Response) {
  const codigoUF = Number(req.params.id);

  const uf = await buscarUfPorId(codigoUF);

  if (uf) return res.send(uf);

  return res.status(404).send({
    Error: 'Não foi possíve encontrar uf por id',
    status: 404,
  });
}

async function criarUf(req: Request, res: Response) {
  const ufDados: IRequest = req.body;
  const resultado = await inserirUf(ufDados);

  if (resultado) {
    const ufs = await buscarUfs();
    return res.status(200).send(ufs);
  }
  return res.status(404).send({});
}

async function atualizaUf(req: Request, res: Response) {
  const ufDados: IRequest = req.body;
  ufDados.codigoUF = Number(req.params.id);
  const resultado = await atualizarUf(ufDados);

  if (resultado) return res.send('uf atualizada');

  return res.status(404).send('Erro ao atualizar');
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

export { atualizaUf, criarUf, excluiUf, listaUfPorId, listarUfs };
