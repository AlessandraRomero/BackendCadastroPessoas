import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Endereco } from './Endereco';

@Entity('TB_PESSOA')
export class Pessoa {
  @PrimaryGeneratedColumn({ name: 'CODIGO_PESSOA' })
  codigoPessoa: number;
  @Column({ name: 'NOME', type: 'varchar', length: 256 })
  nome: string;
  @Column({ name: 'SOBRENOME', type: 'varchar2', length: 256 })
  sobrenome: string;
  @Column({ name: 'IDADE', type: 'number', precision: 3, scale: 0 })
  idade: number;
  @Column({ name: 'LOGIN', type: 'varchar2', length: 50 })
  login: string;
  @Column({ name: 'SENHA', type: 'varchar2', length: 50 })
  senha: string;
  @Column({ name: 'STATUS', type: 'number', precision: 3, scale: 0 })
  status: number;
  @OneToMany(() => Endereco, endereco => endereco.codigoPessoa)
  enderecos: Endereco[];
}
