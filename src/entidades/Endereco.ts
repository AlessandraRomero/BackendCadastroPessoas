import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pessoa } from './Pessoa';
import { Bairro } from './Bairro';

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
  @ManyToOne(() => Pessoa, pessoa => pessoa.enderecos)
  @JoinColumn({ name: 'CODIGO_PESSOA' })
  pessoa: Pessoa;
  @ManyToOne(() => Bairro, bairro => bairro.enderecos)
  @JoinColumn({ name: 'CODIGO_BAIRRO' })
  bairro: Bairro;
}
