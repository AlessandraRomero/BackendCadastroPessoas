import { celebrate } from 'celebrate';
import { Router } from 'express';
import {
  atualizaMunicipio,
  criarMunicipio,
  excluiMunicipio,
  listarMunicipios,
} from '../controllers/municipioController';
import {
  validarGet,
  validarPost,
  validarPut,
} from '../services/municipio/validator';

const municipioRouter = Router();

municipioRouter.get('/', celebrate(validarGet), listarMunicipios);
municipioRouter.post('/', celebrate(validarPost), criarMunicipio);
municipioRouter.put('/', celebrate(validarPut), atualizaMunicipio);
municipioRouter.delete('/:id', excluiMunicipio);

export { municipioRouter };
