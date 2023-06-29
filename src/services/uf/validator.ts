import { Joi, Segments } from 'celebrate';
import { mensagemCustomizada } from '../../erros/ValidatorCustomMessage';

const validarPost = {
  [Segments.BODY]: {
    sigla: Joi.string().required().messages(mensagemCustomizada('sigla')),
    nome: Joi.string().required().messages(mensagemCustomizada('nome')),
    status: Joi.number().precision(3).required(),
  },
};

export { validarPost };
