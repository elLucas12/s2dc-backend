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

@Entity('ProcAceite')
export class ProcAceite {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'date',
    nullable: true,
    transformer: {
      to(value: Date): string {
        let x = value.toISOString();
        return x.split('T')[0];
      },
      from (value: string): Date {
        return new Date(value);
      }
    }
  })
  dataFim: Date;

  @Column({
    type: 'date',
    nullable: false,
    transformer: {
      to(value: Date): string {
        let x = value.toISOString();
        return x.split('T')[0];
      },
      from (value: string): Date {
        return new Date(value);
      }
    }
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
