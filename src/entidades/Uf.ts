import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Municipio } from './Municipio';

@Entity('TB_UF')
export class Uf {
  @PrimaryGeneratedColumn({ name: 'CODIGO_UF' })
  codigoUF: number;
  @Column({ name: 'SIGLA', type: 'varchar2', length: 3 })
  sigla: string;
  @Column({ name: 'NOME', type: 'varchar2', length: 60 })
  nome: string;
  @Column({ name: 'STATUS', type: 'number', precision: 3, scale: 0 })
  status: number;
  @OneToMany(() => Municipio, municipio => municipio.codigoUF)
  municipios?: Municipio[];
}
