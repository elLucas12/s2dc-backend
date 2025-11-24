import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';

export enum FuncionarioSexo {
  MASC = 'Masculino',
  FEM = 'Feminino',
  OUTRO = 'Outro',
}

@Entity('Funcionario')
export class Funcionario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nome: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  cpf: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  ctps: string;

  @Column({
    type: 'enum',
    enum: FuncionarioSexo,
  })
  sexo: FuncionarioSexo;

  @OneToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.funcionario,
  )
  cadastroClinico: CadastroClinico;
}
