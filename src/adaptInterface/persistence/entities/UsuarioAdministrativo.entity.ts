import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import { ProcAceite } from './ProcAceite.entity';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';

@Entity('UsuarioAdministrativo')
export class UsuarioAdministrativo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: UsuarioAdministrativoPermissaoEnumModel,
  })
  permissao: UsuarioAdministrativoPermissaoEnumModel;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nome: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  senha: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nomeDeUsuario: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  email: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @OneToMany(
    () => ProcAceite,
    (procAceite) => procAceite.usuarioAdministrativo,
    {
      eager: false,
      nullable: true,
      cascade: true,
    },
  )
  procsAceite: ProcAceite[];
}
