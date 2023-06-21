import { Router } from 'express';

const rotas = Router();

rotas.get('/', (request, response) => {
  return response.json({ menssagem: 'Hello World!' });
});

export default rotas;
