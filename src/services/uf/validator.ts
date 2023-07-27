import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarGet = {
  [Segments.QUERY]: {
    codigoUF: Joi.number().messages(mensagemCustomizada('codigoUF')),
    sigla: Joi.string().max(3).messages({
      'string.max': 'O campo sigla não pode exceder 3 caracteres.',
      'string.base': `O campo sigla deve ser uma string.`,
      'string.empty': `O campo sigla não pode ser vazio.`,
    }),
    nome: Joi.string().max(60).messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'string.base': `O campo nome deve ser uma string.`,
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
      'any.invalid': `O campo status deve ser um número.`,
    }),
  },
};

const validarPost = {
  [Segments.BODY]: {
    sigla: Joi.string().max(3).required().messages({
      'string.max': 'O campo sigla não pode exceder 3 caracteres.',
      'any.required': 'O campo sigla é obrigatório.',
      'string.base': `O campo sigla deve ser uma string.`,
      'string.empty': `O campo sigla não pode ser vazio.`,
    }),
    nome: Joi.string().max(60).required().messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
      'string.base': `O campo nome deve ser uma string.`,
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().precision(3).valid(1, 2).required().messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
      'any.invalid': `O campo status deve ser um número.`,
    }),
  },
};
const validarPut = {
  [Segments.BODY]: {
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
    sigla: Joi.string().max(3).required().messages({
      'string.max': 'O campo sigla não pode exceder 3 caracteres.',
      'any.required': 'O campo sigla é obrigatório.',
      'string.base': `O campo sigla deve ser uma string.`,
      'string.empty': `O campo sigla não pode ser vazio.`,
    }),
    nome: Joi.string().required().max(60).messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
      'string.base': `O campo nome deve ser uma string.`,
      'string.empty': `O campo nome não pode ser vazio.`,
    }),
    status: Joi.number().required().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
      'number.max': 'O campo status não pode exceder o máximo de 3 dígitos.',
    }),
  },
};

export { validarGet, validarPost, validarPut };
