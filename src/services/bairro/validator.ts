import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarGet = {
  [Segments.QUERY]: {
    codigoBairro: Joi.number().messages(mensagemCustomizada('codigoUF')),
    nome: Joi.string().max(60).messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
    }),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'number.base': `O campo status deve ser um número.`,
    }),
    codigoMunicipio: Joi.number().messages(
      mensagemCustomizada('codigoMunicipio'),
    ),
  },
};

const validarPost = {
  [Segments.BODY]: {
    nome: Joi.string().max(60).required().messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().precision(3).valid(1, 2).required().messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
    codigoMunicipio: Joi.number()
      .required()
      .messages(mensagemCustomizada('codigoMunicipio')),
  },
};
const validarPut = {
  [Segments.BODY]: {
    codigoBairro: Joi.number()
      .required()
      .messages(mensagemCustomizada('codigoBairro')),
    nome: Joi.string().max(60).messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
      'number.max': 'O campo status não pode exceder o máximo de 3 dígitos.',
    }),
    codigoMunicipio: Joi.number().messages(
      mensagemCustomizada('codigoMunicipio'),
    ),
  },
};

export { validarGet, validarPost, validarPut };
