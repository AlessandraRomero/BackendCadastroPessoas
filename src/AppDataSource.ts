import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'oracle',
  host: '172.17.0.1',
  port: 1521,
  username: 'C##NODE',
  password: 'node',
  database: 'pessoasapi',
  entities: [`${__dirname}/**/entidades/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
});
