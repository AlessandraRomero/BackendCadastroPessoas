import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarPost = {
  [Segments.BODY]: {
    sigla: Joi.string().required().messages(mensagemCustomizada('sigla')),
    nome: Joi.string().required().messages(mensagemCustomizada('nome')),
    status: Joi.number()
      .precision(3)
      .required()
      .messages(mensagemCustomizada('status')),
  },
};
const validarPut = {
  [Segments.BODY]: {
    //codigoUf: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
    sigla: Joi.string().required().messages(mensagemCustomizada('sigla')),
    nome: Joi.string().required().messages(mensagemCustomizada('nome')),
    status: Joi.number()
      .precision(3)
      .required()
      .messages(mensagemCustomizada('status')),
  },
};
const validarDelete = {
  [Segments.PARAMS]: {
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
  },
};

export { validarDelete, validarPost, validarPut };
