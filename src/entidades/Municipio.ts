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
  @PrimaryGeneratedColumn({ name: 'CODIGO_MUNICIPIO' })
  codigoMunicipio: number;
  @Column({ name: 'NOME', type: 'varchar2', length: 256, nullable: true })
  nome: string;
  @Column({
    name: 'STATUS',
    type: 'number',
    precision: 3,
    scale: 0,
    nullable: true,
  })
  status: number;
  @OneToMany(() => Bairro, bairro => bairro.codigoMunicipio)
  bairros: Bairro[];
  @ManyToOne(() => Uf, uf => uf.municipios, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'CODIGO_UF' })
  codigoUF: Uf;
}
