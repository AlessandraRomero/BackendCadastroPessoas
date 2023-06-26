import { Request, Response } from 'express';
import { Uf } from '../entidades/Uf';
import { atualizarMunicipio } from '../services/municipio/atualizarMunicipio';
import { buscarMunicipios } from '../services/municipio/buscarMunicipios';
import { excluirMunicipio } from '../services/municipio/excluirMunicipio';
import { inserirMunicipio } from '../services/municipio/inserirMunicipio';
import { buscarPessoaPorId } from '../services/pessoa/buscarPessoaPorId';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
  uf: Uf;
}

async function listarMunicipios(req: Request, res: Response) {
  const municipios = await buscarMunicipios();

  if (municipios) return res.status(200).send(municipios);

  return res.status(404).send({
    mensagem: 'Não foi possível encontrar todos os bairros',
    status: 404,
  });
}

async function listaMunicipioPorId(req: Request, res: Response) {
  const codigoMunicipio = Number(req.params.id);

  const municipio = await buscarPessoaPorId(codigoMunicipio);

  if (municipio) return res.send(municipio);

  return res.status(404).send({
    Error: 'Não foi possíve encontrar municipio por id',
    status: 404,
  });
}

async function criarMunicipio(req: Request, res: Response) {
  const municipioDados: IRequest = req.body;
  const resultado = await inserirMunicipio(municipioDados);

  if (resultado) {
    const municipios = await buscarMunicipios();
    return res.status(200).send(municipios);
  }
  return res.status(404).send({});
}

async function atualizaMunicipio(req: Request, res: Response) {
  const municipioDados: IRequest = req.body;
  municipioDados.codigoMunicipio = Number(req.params.id);
  const resultado = await atualizarMunicipio(municipioDados);

  if (resultado) return res.send('municipio atualizada');

  return res.status(404).send('Erro ao atualizar');
}

async function excluiMunicipio(req: Request, res: Response) {
  const codigoMunicipio = Number(req.params.id);

  const municipio = await excluirMunicipio(codigoMunicipio);

  if (municipio) return res.send(municipio);

  return res.status(404).send({
    Mensagem: 'Não foi possível localizar municipio',
    status: 404,
  });
}

export {
  atualizaMunicipio,
  criarMunicipio,
  excluiMunicipio,
  listaMunicipioPorId,
  listarMunicipios,
};
