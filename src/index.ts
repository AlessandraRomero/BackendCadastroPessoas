import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import rotas from './rotas/index';
import { AppDataSource } from './AppDataSource';
import AppError from './erros/AppError';

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
          messagem: error.messagem,
        });
      }

      return response.status(500).json({
        status: 'error',
        messagem: 'Erro do Servidor Interno',
      });
    },
  );
  app.listen(1522, () => {
    console.log('Servidor rodando na porta 1522');
  });
});
