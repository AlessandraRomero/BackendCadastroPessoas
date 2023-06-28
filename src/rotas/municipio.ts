import { Router } from 'express';
import {
  atualizaMunicipio,
  criarMunicipio,
  excluiMunicipio,
  listarMunicipios,
} from '../controllers/municipioController';

const municipioRouter = Router();

municipioRouter.get('/', listarMunicipios);
municipioRouter.post('/', criarMunicipio);
municipioRouter.put('/', atualizaMunicipio);
municipioRouter.delete('/:id', excluiMunicipio);

export { municipioRouter };
