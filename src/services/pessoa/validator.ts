import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarGet = {
  [Segments.QUERY]: Joi.object().keys({
    codigoPessoa: Joi.number().messages(mensagemCustomizada('codigoPessoa')),
    nome: Joi.string().messages(mensagemCustomizada('nome')),
    sobrenome: Joi.string().messages(mensagemCustomizada('sobrenome')),
    idade: Joi.number().precision(3).messages(mensagemCustomizada('idade')),
    login: Joi.string().messages(mensagemCustomizada('login')),
    senha: Joi.string().messages(mensagemCustomizada('senha')),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
  }),
};

const validarPost = {
  [Segments.BODY]: Joi.object().keys({
    nome: Joi.string()
      .max(256)
      .required()
      .messages(mensagemCustomizada('nome')),
    sobrenome: Joi.string()
      .max(256)
      .required()
      .messages(mensagemCustomizada('sobrenome')),
    idade: Joi.number()
      .precision(3)
      .required()
      .messages(mensagemCustomizada('idade')),
    login: Joi.string().max(256).required().messages({
      'string.max': 'O campo login não pode exceder 256 caracteres.',
      'any.required': 'O campo login é obrigatório.',
    }),
    senha: Joi.string().max(256).required().messages({
      'string.max': 'O campo senha não pode exceder 256 caracteres.',
      'string.empty': `O campo senha não pode ser vazio.`,
      'any.required': 'O campo senha é obrigatório.',
    }),
    status: Joi.number().valid(1, 2).precision(3).required().messages({
      'any.only': 'O campo status só pode receber o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
    enderecos: Joi.array()
      .items(
        Joi.object().keys({
          nomeRua: Joi.string().max(256).required().messages({
            'string.max': 'O campo nomeRua não pode exceder 256 caracteres.',
            'any.required': 'O campo nomeRua é obrigatório.',
            'string.base': `O campo nomeRua deve ser uma string.`,
          }),
          numero: Joi.string().max(10).required().messages({
            'string.max': 'O campo numero não pode exceder 256 caracteres.',
            'any.required': 'O campo numero é obrigatório.',
            'string.base': `O campo numero deve ser uma string.`,
          }),
          complemento: Joi.string().max(20).messages({
            'string.max': 'O campo complemento não pode exceder 20 caracteres.',
          }),
          cep: Joi.string().required().messages(mensagemCustomizada('cep')),
          codigoBairro: Joi.number()
            .required()
            .messages(mensagemCustomizada('codigoBairro')),
        }),
      )
      .required()
      .min(1)
      .messages({
        'any.required': 'Pelo menos um endereço é nescesssário',
      }),
  }),
};

const validarPut = {
  [Segments.BODY]: Joi.object().keys({
    codigoPessoa: Joi.number()
      .required()
      .messages(mensagemCustomizada('codigoPessoa')),
    nome: Joi.string()
      .max(256)
      .required()
      .messages(mensagemCustomizada('nome')),
    sobrenome: Joi.string()
      .max(256)
      .required()
      .messages(mensagemCustomizada('sobrenome')),
    idade: Joi.number()
      .precision(3)
      .required()
      .messages(mensagemCustomizada('idade')),
    login: Joi.string().required().max(50).messages({
      'string.max': 'O campo login não pode exceder 50 caracteres.',
      'any.required': 'O campo login é obrigatório.',
      'string.base': `O campo login deve ser uma string.`,
    }),
    senha: Joi.string().required().max(50).messages({
      'string.max': 'O campo senha não pode exceder 50 caracteres.',
      'any.required': 'O campo senha é obrigatório.',
      'string.base': `O campo senha deve ser uma string.`,
    }),
    status: Joi.number().required().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
      'number.max': 'O campo status não pode exceder o máximo de 3 dígitos.',
    }),
    enderecos: Joi.array().items(
      Joi.object().keys({
        codigoEndereco: Joi.number().messages(
          mensagemCustomizada('codigoEndereco'),
        ),
        nomeRua: Joi.string().required().max(256).messages({
          'string.max': 'O campo nomeRua não pode exceder 256 caracteres.',
          'any.required': 'O campo nomeRua é obrigatório.',
          'string.base': `O campo nomeRua deve ser uma string.`,
        }),
        numero: Joi.string().required().max(10).messages({
          'string.max': 'O campo numero não pode exceder 10 caracteres.',
          'any.required': 'O campo numero é obrigatório.',
          'string.base': `O campo numerero deve ser uma string.`,
        }),
        complemento: Joi.string().max(20).messages({
          'string.max': 'O campo complemento não pode exceder 20 caracteres.',
          'string.base': `O campo complemento deve ser uma string.`,
        }),
        cep: Joi.string().required().messages(mensagemCustomizada('cep')),
        codigoPessoa: Joi.number()
          .required()
          .messages(mensagemCustomizada('codigoPessoa')),
        codigoBairro: Joi.number()
          .required()
          .messages(mensagemCustomizada('codigoBairro')),
      }),
    ),
  }),
};

export { validarGet, validarPost, validarPut };
