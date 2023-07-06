import { CelebrateError } from 'celebrate';
import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import { ValidationError } from 'joi';
import { AppDataSource } from './AppDataSource';
import { rotas } from './rotas';

const app = express();

AppDataSource.initialize().then(() => {
  app.use(cors());
  app.use(express.json());

  app.use(rotas);

  app.use(
    (error: any, request: Request, response: Response, next: NextFunction) => {
      if (error instanceof CelebrateError) {
        const errorBody = Array.from(error.details.values()).map(
          (error: ValidationError) => error.message,
        );
        return response.status(400).json({
          status: '400',
          mensagem: errorBody.join(', '), // Concatenando as mensagens de erro em uma única string separada por vírgula
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
