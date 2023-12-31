import { Request, Response } from 'express';
import { Municipio } from '../entidades/Municipio';
import { atualizarBairro } from '../services/bairro/atualizarBairro';
import { buscarBairroEmMunicipio } from '../services/bairro/buscarBairroEmMunicipio';
import { buscarBairroPor } from '../services/bairro/buscarBairroPor';
import { buscarBairros } from '../services/bairro/buscarBairros';
import { excluirBairro } from '../services/bairro/excluirBairro';
import { filtrosBairro } from '../services/bairro/filtrosBairro';
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
  const bairros = await filtrosBairro(filtros);

  if (bairros) return res.status(200).send(bairros);

  return res.status(404).send([]);
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
      mensagem: 'O código do município não existe',
      status: 400,
    });
  }
  // console.log('codigo municipio', bairroDados.codigoMunicipio);

  const bairroExistente = await buscarBairroEmMunicipio(
    bairroDados.nome,
    bairroDados.codigoMunicipio,
  );

  if (bairroExistente) {
    return res.status(400).send({
      mensagem:
        'Já existe um bairro com o mesmo nome para o código do município fornecido',
      status: 400,
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
  return res.status(400).send({
    mensagem: 'Não foi possível incluir bairro no banco de dados.',
    status: 404,
  });
}

async function atualizaBairro(req: Request, res: Response) {
  const bairroDados: IRequest = req.body;
  const municipioExiste = await buscarMunicipioPor({
    codigoMunicipio: bairroDados.codigoMunicipio,
  });

  const bairroExiste = await buscarBairroPor({
    codigoBairro: bairroDados.codigoBairro,
  });

  if (!municipioExiste || !bairroExiste)
    return res.status(404).send({
      mensagem: 'Não foi possível localizar',
      status: 404,
    });

  console.log('DADOS BAIRRO: ', bairroDados);
  const bairroNovo = {
    codigoBairro: bairroDados.codigoBairro,
    nome: bairroDados.nome,
    status: bairroDados.status,
    codigoMunicipio: municipioExiste[0],
  };

  const resultado = await atualizarBairro(bairroNovo);
  console.log('resultado', resultado);
  if (!resultado) {
    return res.status(400).send({
      mensagem: 'Já existe um bairro com o mesmo nome',
      status: 400,
    });
  }
  const bairros = await buscarBairros();
  return res.status(200).send(bairros);
}

async function excluiBairro(req: Request, res: Response) {
  const codigoBairro = Number(req.params.id);

  const bairro = await excluirBairro(codigoBairro);

  if (bairro) return res.send(bairro);

  return res.status(404).send({
    Mensagem: 'Não foi possível alterar bairro no banco de dados.',
    status: 404,
  });
}

export { atualizaBairro, criarBairro, excluiBairro, listarBairros };
