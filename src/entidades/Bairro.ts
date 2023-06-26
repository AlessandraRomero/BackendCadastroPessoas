import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Endereco } from './Endereco';
import { Municipio } from './Municipio';

@Entity('TB_BAIRRO')
export class Bairro {
  @PrimaryGeneratedColumn({ name: 'CODIGO_BAIRRO' })
  codigoBairro: number;
  @Column({ name: 'NOME', type: 'varchar2', length: 256 })
  nome: string;
  @Column({ name: 'STATUS', type: 'number', precision: 3, nullable: true })
  status: number;
  @OneToMany(() => Endereco, endereco => endereco.bairro)
  enderecos: Endereco[];
  @ManyToOne(() => Municipio, municipio => municipio.bairros)
  @JoinColumn({ name: 'CODIGO_MUNICIPIO' })
  municipio: Municipio;
}
