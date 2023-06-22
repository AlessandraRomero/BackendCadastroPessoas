import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Municipio } from './Municipio';

@Entity('TB_UF')
export class Uf {
  @PrimaryGeneratedColumn({ name: 'CODIGO_UF' })
  codigoUf: number;
  @Column({ name: 'SIGLA', type: 'varchar2', length: 3 })
  sigla: string;
  @Column({ name: 'NOME', type: 'varchar2', length: 60 })
  nome: string;
  @Column({ name: 'STATUS', width: 3 })
  status: number;
  @OneToMany(() => Municipio, municipio => municipio.uf)
  municipios: Municipio[];
}
