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
  @PrimaryGeneratedColumn()
  codigoEndereco: number;
  @Column()
  nomeRua: string;
  @Column()
  numero: string;
  @Column()
  complenmento: string;
  @Column()
  cep: string;
  @ManyToOne(() => Pessoa, pessoa => pessoa.enderecos)
  @JoinColumn({ name: 'codigoPessoa' })
  pessoa: Pessoa;
  @ManyToOne(() => Bairro, bairro => bairro.enderecos)
  @JoinColumn({ name: 'codigoBairro' })
  bairro: Bairro;
}
