import { Request, Response } from 'express';
import { Municipio } from '../entidades/Municipio';
import { atualizarBairro } from '../services/bairro/atualizarBairro';
import { buscarBairroPor } from '../services/bairro/buscarBairroPor';
import { buscarBairros } from '../services/bairro/buscarBairros';
import { excluirBairro } from '../services/bairro/excluirBairro';
import { inserirBairro } from '../services/bairro/inserirBairro';
import { buscarMunicipioPor } from '../services/municipio/buscarMunicipioPor';

interface IRequest {
  codigoBairro: number;
  nome: string;
  status: number;
  codigoMunicipio: number;
}

async function listarBairros(req: Request, res: Response) {
  const filtros: IFilter = req.query;
  const bairos = await buscarBairroPor(filtros);

  if (bairos) return res.status(200).send(bairos);

  return res.status(404).send({
    mensagem: 'Não foi possível consultar município no banco de dados.',
    status: 404,
  });
}
interface IFilter {
  codigoBairro?: number;
  nome?: string;
  status?: number;
  codigoMunicipio?: Municipio;
}

async function criarBairro(req: Request, res: Response) {
  const bairroDados: IRequest = req.body;
  const municipioExiste = await buscarMunicipioPor({
    codigoMunicipio: bairroDados.codigoMunicipio,
  });

  if (!municipioExiste) {
    return res.status(404).send({
      mensagem: 'Não foi possível localizar bairro',
      status: 404,
    });
  }
  const bairroNovo = {
    nome: bairroDados.nome,
    status: bairroDados.status,
    codigoMunicipio: municipioExiste[0],
  };

  const resultado = await inserirBairro(bairroNovo);

  if (resultado) {
    const bairros = await buscarBairros();
    return res.status(200).send(bairros);
  }

  return res.status(404).send({
    mensagem: 'Não foi possível incluir bairro no banco de dados.',
    status: 404,
  });
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

export { atualizaBairro, criarBairro, excluiBairro, listarBairros };
