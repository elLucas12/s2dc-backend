import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import { FuncionarioSexoEnumModel } from 'src/domain/entities/FuncionarioModel.entity';

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
    enum: FuncionarioSexoEnumModel,
  })
  sexo: FuncionarioSexoEnumModel;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  senha: string;

  @OneToMany(() => CadastroClinico, (cadastroClinico) => cadastroClinico.funcionario, {
    eager: true,
    nullable: true,
    cascade: true,
  })
  cadastrosClinicos: CadastroClinico[];
}
