import { Request, Response } from 'express';
import { buscarBairroPor } from '../services/bairro/buscarBairroPor';
import { atualizarEndereco } from '../services/endereco/atualizarEndereco';
import { buscarEnderecoPorId } from '../services/endereco/buscarEnderecoPorId';
import { buscarEnderecos } from '../services/endereco/buscarEnderecos';
import { inserirEndereco } from '../services/endereco/inserirEndereco';
import { buscarPessoaPor } from '../services/pessoa/buscarPessoaPor';
import { excluirPessoa } from '../services/pessoa/excluirPessoa';

interface IRequest {
  codigoEndereco: number;
  nomeRua: string;
  numero: string;
  complemento: string;
  cep: string;
  codigoPessoa: number;
  codigoBairro: number;
}

async function listarEnderecos(req: Request, res: Response) {
  const enderecos = await buscarEnderecos();

  if (enderecos) return res.status(200).send(enderecos);

  return res.status(404).send({
    status: 404,
    menssagem: 'Não foi possível encontrar todos os endereços',
  });
}

async function listaEnderecoPorId(req: Request, res: Response) {
  const codigoEndereco = Number(req.params.id);

  const endereco = await buscarEnderecoPorId(codigoEndereco);

  if (endereco) return res.send(endereco);

  return res.status(404).send({
    Error: 'Não foi possível encontrar endereco por id',
    status: 404,
  });
}

async function criarEndereco(req: Request, res: Response) {
  const enderecoDados: IRequest = req.body;
  const pessoaExiste = await buscarPessoaPor({
    codigoPessoa: enderecoDados.codigoEndereco,
  });
  const bairroExiste = await buscarBairroPor({
    codigoBairro: enderecoDados.codigoBairro,
  });

  if (!pessoaExiste && !bairroExiste)
    return res.status(404).send({
      mensagem: 'Não foi possível localizar uf',
      status: 404,
    });

  const enderecoNovo = {
    nomeRua: enderecoDados.nomeRua,
    numero: enderecoDados.numero,
    complemento: enderecoDados.complemento,
    cep: enderecoDados.cep,
    codigoPessoa: pessoaExiste[0],
    codigoBairro: bairroExiste[0],
  };

  const resultado = await inserirEndereco(enderecoNovo);

  if (resultado) {
    const enderecos = await buscarEnderecos();
    return res.status(200).send(enderecos);
  }
  return res.status(404).send({});
}

async function atualizaEndereco(req: Request, res: Response) {
  const enderecoDados: IRequest = req.body;
  enderecoDados.codigoEndereco = Number(req.params.id);
  const resultado = await atualizarEndereco(enderecoDados);

  if (resultado) return res.send('Endereco atualizada');

  return res.status(404).send('Erro ao atualizar');
}

async function excluiEndereco(req: Request, res: Response) {
  const codigoEndereco = Number(req.params.id);

  const endereco = await excluirPessoa(codigoEndereco);

  if (endereco) return res.send(endereco);

  return res.status(404).send({
    Mensagem: 'Não foi possível localizar endereço',
    status: 404,
  });
}

export {
  atualizaEndereco,
  criarEndereco,
  excluiEndereco,
  listaEnderecoPorId,
  listarEnderecos,
};
