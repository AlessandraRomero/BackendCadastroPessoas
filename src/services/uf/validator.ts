import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarGet = {
  [Segments.QUERY]: {
    codigoUF: Joi.number().messages(mensagemCustomizada('codigoUF')),
    sigla: Joi.string().max(3).messages({
      'string.max': 'O campo sigla não pode exceder 3 caracteres.',
    }),
    nome: Joi.string().max(60).messages({
      'string.max': 'O campo sigla não pode exceder 60 caracteres.',
    }),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
  },
};

const validarPost = {
  [Segments.BODY]: {
    sigla: Joi.string().max(3).required().messages({
      'string.max': 'O campo sigla não pode exceder 3 caracteres.',
      'any.required': 'O campo sigla é obrigatório.',
    }),
    nome: Joi.string().max(60).required().messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
    }),
    status: Joi.number().precision(3).valid(1, 2).required().messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
    }),
  },
};
const validarPut = {
  [Segments.BODY]: {
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
    sigla: Joi.string().max(3).required().messages({
      'string.max': 'O campo sigla não pode exceder 3 caracteres.',
      'any.required': 'O campo sigla é obrigatório.',
    }),
    nome: Joi.string().max(60).messages({
      'string.max': 'O campo nome não pode exceder 60 caracteres.',
      'any.required': 'O campo nome é obrigatório.',
    }),
    status: Joi.number().precision(3).valid(1, 2).messages({
      'any.only': 'O campo status só pode ter o valor 1 ou 2.',
      'any.required': 'O campo status é obrigatório.',
      'number.max': 'O campo status não pode exceder o máximo de 3 dígitos.',
    }),
  },
};

export { validarGet, validarPost, validarPut };
