import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { UsuarioAdministrativo } from './UsuarioAdministrativo.entity';
import { CadastroClinico } from './CadastroClinico.entity';
import { EventoProcAceite } from './EventoProcAceite.entity';
import { DateTransformer } from '../date.transformer';

@Entity('ProcAceite')
export class ProcAceite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  cancelado: boolean = false;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  aprovado: boolean = false;

  @Column({
    type: 'date',
    nullable: true,
    transformer: DateTransformer,
  })
  dataFim: Date;

  @Column({
    type: 'date',
    nullable: false,
    transformer: DateTransformer,
  })
  dataInicio: Date;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @ManyToOne(
    () => UsuarioAdministrativo,
    (usuarioAdministrativo) => usuarioAdministrativo.procsAceite,
  )
  usuarioAdministrativo: UsuarioAdministrativo;

  @OneToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.procAceite,
  )
  cadastroClinico: CadastroClinico;

  @OneToMany(
    () => EventoProcAceite,
    (eventoProcAceite) => eventoProcAceite.procAceite,
    {
      eager: true,
      nullable: false,
      cascade: true,
    },
  )
  eventosProcAceite: EventoProcAceite[];
}
