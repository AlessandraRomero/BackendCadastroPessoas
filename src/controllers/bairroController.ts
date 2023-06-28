import { Request, Response } from 'express';
import { Municipio } from '../entidades/Municipio';
import { atualizarBairro } from '../services/bairro/atualizarBairro';
import { buscarBairros } from '../services/bairro/buscarBairros';
import { excluirBairro } from '../services/bairro/excluirBairro';
import { inserirBairro } from '../services/bairro/inserirBairro';
import { buscarPessoaPorId } from '../services/pessoa/buscarPessoaPorId';

interface IRequest {
  codigoBairro: number;
  nome: string;
  status: number;
  codigoMunicipio: Municipio;
}

async function listarBairros(req: Request, res: Response) {
  const bairos = await buscarBairros();

  if (bairos) return res.status(200).send(bairos);

  return res.status(404).send({
    mensagem: 'Não foi possível encontrar todos os bairros',
    status: 404,
  });
}

async function listaBairroPorId(req: Request, res: Response) {
  const codigoBairro = Number(req.params.id);

  const bairro = await buscarPessoaPorId(codigoBairro);

  if (bairro) return res.send(bairro);

  return res.status(404).send({
    Error: 'Não foi possíve encontrar bairro por id',
    status: 404,
  });
}

async function criarBairro(req: Request, res: Response) {
  const bairroDados: IRequest = req.body;
  const resultado = await inserirBairro(bairroDados);

  if (resultado) {
    const bairros = await buscarBairros();
    return res.status(200).send(bairros);
  }
  return res.status(404).send({});
}

async function atualizaBairro(req: Request, res: Response) {
  const bairroDados: IRequest = req.body;
  bairroDados.codigoBairro = Number(req.params.id);
  const resultado = await atualizarBairro(bairroDados);

  if (resultado) return res.send('bairro atualizada');

  return res.status(404).send('Erro ao atualizar');
}

async function excluiBairro(req: Request, res: Response) {
  const codigoBairro = Number(req.params.id);

  const bairro = await excluirBairro(codigoBairro);

  if (bairro) return res.send(bairro);

  return res.status(404).send({
    Mensagem: 'Não foi possível localizar bairro',
    status: 404,
  });
}

export {
  atualizaBairro,
  criarBairro,
  excluiBairro,
  listaBairroPorId,
  listarBairros,
};
