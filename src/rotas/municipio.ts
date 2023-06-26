import { Router } from 'express';
import {
  atualizaMunicipio,
  criarMunicipio,
  excluiMunicipio,
  listaMunicipioPorId,
  listarMunicipios,
} from '../controllers/municipioController';

const municipioRouter = Router();

municipioRouter.get('/municipios', listarMunicipios);
municipioRouter.get('/municipio/:id', listaMunicipioPorId);
municipioRouter.post('/municipio', criarMunicipio);
municipioRouter.put('/municipio/:id', atualizaMunicipio);
municipioRouter.delete('/municipio/:id', excluiMunicipio);

export { municipioRouter };
