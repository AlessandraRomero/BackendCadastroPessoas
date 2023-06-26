import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { AppDataSource } from './AppDataSource';
import AppError from './erros/AppError';
import { rotas } from './rotas';

const app = express();

AppDataSource.initialize().then(() => {
  app.use(cors());
  app.use(express.json());

  app.use(rotas);

  app.use(
    (
      error: Error,
      request: Request,
      response: Response,
      next: NextFunction,
    ) => {
      if (error instanceof AppError) {
        return response.status(error.status).json({
          status: 'error',
          mensagem: error.messagem,
        });
      }
      return response.status(500).json({
        status: 'error',
        mensagem: 'Erro do servidor Interno',
      });
    },
  );
  app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333');
  });
});
