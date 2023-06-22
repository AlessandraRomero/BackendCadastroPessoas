import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Bairro } from './Bairro';
import { Uf } from './Uf';

@Entity('TB_MUNICIPIO')
export class Municipio {
  @PrimaryGeneratedColumn()
  codigoMunicipio: number;
  @Column()
  nome: string;
  @Column()
  status: number;
  @OneToMany(() => Bairro, bairro => bairro.municipio)
  bairros: Bairro[];
  @ManyToOne(() => Uf, uf => uf.municipios)
  @JoinColumn({ name: 'codigoUf' })
  uf: Uf;
}
