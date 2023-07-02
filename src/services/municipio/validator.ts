import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarPost = {
  [Segments.BODY]: {
    nome: Joi.string().required().messages(mensagemCustomizada('nome')),
    status: Joi.number()
      .precision(3)
      .required()
      .messages(mensagemCustomizada('status')),
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
  },
};
const validarPut = {
  [Segments.BODY]: {
    codigoMunicipio: Joi.number()
      .required()
      .messages(mensagemCustomizada('codigoMunicipio')),
    nome: Joi.string().required().messages(mensagemCustomizada('nome')),
    status: Joi.number()
      .precision(3)
      .required()
      .messages(mensagemCustomizada('status')),
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
  },
};
const validarDelete = {
  [Segments.PARAMS]: {
    codigoUF: Joi.number().required().messages(mensagemCustomizada('codigoUF')),
  },
};

export { validarDelete, validarPost, validarPut };
