import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';

import { MedicamentoRegistrado } from './MedicamentoRegistrado.entity';
import { AlergiaRegistrada } from './AlergiaRegistrada.entity';
import { CirurgiaRegistrada } from './CirurgiaRegistrada.entity';
import { DoencaRegistrada } from './DoencaRegistrada.entity';
import { TipoSanguineo } from './TipoSanguineo.entity';
import { ProcAceite } from './ProcAceite.entity';
import { Funcionario } from './Funcionario.entity';

@Entity('CadastroClinico')
export class CadastroClinico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  numeroEmergencia: string;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @ManyToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.cadastrosClinicos,
  )
  medicamentosRegistrados: MedicamentoRegistrado[];

  @OneToMany(
    () => AlergiaRegistrada,
    (alergiaRegistrada) => alergiaRegistrada.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
      cascade: true,
    },
  )
  alergiasRegistradas: AlergiaRegistrada[];

  @OneToMany(
    () => CirurgiaRegistrada,
    (cirurgiaRegistrada) => cirurgiaRegistrada.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
      cascade: true,
    },
  )
  cirurgiasRegistradas: CirurgiaRegistrada[];

  @OneToMany(
    () => DoencaRegistrada,
    (doencaRegistrada) => doencaRegistrada.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
      cascade: true,
    },
  )
  doencasRegistradas: DoencaRegistrada[];

  @ManyToOne(
    () => TipoSanguineo,
    (tipoSanguineo) => tipoSanguineo.cadastrosClinicos,
  )
  tipoSanguineo: TipoSanguineo;

  @OneToOne(() => ProcAceite, (procAceite) => procAceite.cadastroClinico, {
    eager: true,
    nullable: false,
    cascade: true,
  })
  @JoinColumn()
  procAceite: ProcAceite;

  @ManyToOne(
    () => Funcionario,
    (funcionario) => funcionario.cadastrosClinicos,
  )
  funcionario: Funcionario;
}
