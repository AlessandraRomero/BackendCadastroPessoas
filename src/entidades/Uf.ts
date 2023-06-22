import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Municipio } from './Municipio';

@Entity('TB_UF')
export class Uf {
  @PrimaryGeneratedColumn()
  codigoUf: number;
  @Column()
  sigla: string;
  @Column()
  nome: string;
  @Column()
  status: number;
  @OneToMany(() => Municipio, municipio => municipio.uf)
  municipios: Municipio[];
}
