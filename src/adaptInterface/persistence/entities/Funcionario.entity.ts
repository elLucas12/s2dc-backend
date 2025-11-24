import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';

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

  @OneToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.funcionario,
  )
  cadastroClinico: CadastroClinico;
}
