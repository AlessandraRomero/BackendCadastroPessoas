import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bairro } from './Bairro';
import { Pessoa } from './Pessoa';

@Entity('TB_ENDERECO')
export class Endereco {
  @PrimaryGeneratedColumn({ name: 'CODIGO_ENDERECO' })
  codigoEndereco: number;
  @Column({ name: 'NOME_RUA', type: 'varchar2', length: 256 })
  nomeRua: string;
  @Column({ name: 'NUMERO', type: 'varchar2', length: 10 })
  numero: string;
  @Column({ name: 'COMPLEMENTO', type: 'varchar2', length: 20, nullable: true })
  complemento: string;
  @Column({ name: 'CEP', type: 'varchar2', length: 10 })
  cep: string;
  @ManyToOne(() => Pessoa, pessoa => pessoa.enderecos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'CODIGO_PESSOA' })
  codigoPessoa: Pessoa;
  @ManyToOne(() => Bairro, bairro => bairro.enderecos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'CODIGO_BAIRRO' })
  codigoBairro: Bairro;
}
