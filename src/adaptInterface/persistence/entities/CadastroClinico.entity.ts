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

  @OneToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.cadastroClinico,
    {
      eager: true,
      nullable: true,
    },
  )
  medicamentosRegistrados: MedicamentoRegistrado[];

  @OneToMany(
    () => AlergiaRegistrada,
    (alergiaRegistrada) => alergiaRegistrada.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
    },
  )
  alergiasRegistradas: AlergiaRegistrada[];

  @OneToMany(
    () => CirurgiaRegistrada,
    (cirurgiaRegistrada) => cirurgiaRegistrada.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
    },
  )
  cirurgiasRegistradas: CirurgiaRegistrada[];

  @OneToMany(
    () => DoencaRegistrada,
    (doencaRegistrada) => doencaRegistrada.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
    },
  )
  doencasRegistradas: DoencaRegistrada[];

  @OneToMany(
    () => TipoSanguineo,
    (tipoSanguineo) => tipoSanguineo.cadastroClinico,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
    },
  )
  tiposSanguineos: TipoSanguineo[];

  @OneToOne(() => ProcAceite, (procAceite) => procAceite.cadastroClinico, {
    eager: true,
    nullable: false,
  })
  @JoinColumn()
  procAceite: ProcAceite;

  @ManyToOne(
    () => Funcionario,
    (funcionario) => funcionario.cadastrosClinicos,
  )
  funcionario: Funcionario;
}
