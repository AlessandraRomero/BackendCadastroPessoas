import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarGet = {
  [Segments.QUERY]: {
    codigoMunicipio: Joi.number().messages(
      mensagemCustomizada('codigoMunicipio'),
    ),
    nome: Joi.string().max(256).messages({
      'string.max': 'O campo nome não pode exceder 256 caracteres.',
    }),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'number.base': `O campo status deve ser um número.`,
    }),
    codigoUF: Joi.number().messages(mensagemCustomizada('codigoUF')),
  },
};

const validarPost = {
  [Segments.BODY]: {
    nome: Joi.string().max(256).required().messages({
      'string.max': 'O campo nome não pode exceder 256 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().precision(3).valid(1, 2).required().messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
  },
};
const validarPut = {
  [Segments.BODY]: {
    codigoMunicipio: Joi.number()
      .required()
      .messages(mensagemCustomizada('codigoMunicipio')),
    nome: Joi.string().max(256).required().messages({
      'string.max': 'O campo nome não pode exceder 256 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().precision(3).valid(1, 2).required().messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
  },
};

export { validarGet, validarPost, validarPut };
