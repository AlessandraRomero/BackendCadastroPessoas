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
  @PrimaryGeneratedColumn()
  codigoBairro: number;
  @Column()
  nome: string;
  @Column()
  status: number;
  @OneToMany(() => Endereco, endereco => endereco.bairro)
  enderecos: Endereco[];
  @ManyToOne(() => Municipio, municipio => municipio.bairros)
  @JoinColumn({ name: 'codigoMunicipio' })
  municipio: Municipio;
}
