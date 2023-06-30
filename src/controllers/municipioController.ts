import { Request, Response } from 'express';
import { Uf } from '../entidades/Uf';
import { atualizarMunicipio } from '../services/municipio/atualizarMunicipio';
import { buscarMunicipioPor } from '../services/municipio/buscarMunicipioPor';
import { buscarMunicipios } from '../services/municipio/buscarMunicipios';
import { excluirMunicipio } from '../services/municipio/excluirMunicipio';
import { inserirMunicipio } from '../services/municipio/inserirMunicipio';
import { buscarUfPor } from '../services/uf/buscarUfPor';

interface IRequest {
  codigoMunicipio: number;
  nome: string;
  status: number;
  codigoUF: number;
}

async function listarMunicipios(req: Request, res: Response) {
  const filtros: IFilter = req.query;
  const municipios = await buscarMunicipioPor(filtros);

  if (municipios) return res.status(200).send(municipios);

  return res.status(404).send({
    mensagem: 'Não foi possível encontrar todos os bairros',
    status: 404,
  });
}

interface IFilter {
  codigoMunicipio?: number;
  nome?: string;
  status?: number;
  codigoUF?: Uf;
}

async function criarMunicipio(req: Request, res: Response) {
  const municipioDados: IRequest = req.body;
  const ufExiste = await buscarUfPor({ codigoUF: municipioDados.codigoUF });

  if (!ufExiste)
    return res.status(404).send({
      mensagem: 'Não foi possível localizar uf',
      status: 404,
    });

  const municipioNovo = {
    nome: municipioDados.nome,
    status: municipioDados.status,
    codigoUF: ufExiste[0],
  };

  const resultado = await inserirMunicipio(municipioNovo);

  if (resultado) {
    const municipios = await buscarMunicipios();
    return res.status(200).send(municipios);
  }
  return res.status(404).send({});
}

async function atualizaMunicipio(req: Request, res: Response) {
  const municipioDados: IRequest = req.body;
  const ufExiste = await buscarUfPor({ codigoUF: municipioDados.codigoUF });
  const municipioExiste = await buscarMunicipioPor({
    codigoMunicipio: municipioDados.codigoMunicipio,
  });
  if (!ufExiste || !municipioExiste)
    return res.status(404).send({
      mensagem: 'Não foi possível localizar',
      status: 404,
    });

  const municipioNovo = {
    codigoMunicipio: municipioDados.codigoMunicipio,
    nome: municipioDados.nome,
    status: municipioDados.status,
    codigoUF: ufExiste[0],
  };

  const resultado = await atualizarMunicipio(municipioNovo);

  if (resultado) {
    const municipios = await buscarMunicipios();
    return res.status(200).send(municipios);
  }
  return res.status(404).send({});
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

export { atualizaMunicipio, criarMunicipio, excluiMunicipio, listarMunicipios };
