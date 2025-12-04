import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
} from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import { MedicamentoRegistrado } from './MedicamentoRegistrado.entity';
import { DateTransformer } from '../date.transformer';

@Entity('DoencaRegistrada')
export class DoencaRegistrada {
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
  cid: string;

  @Column({
    type: 'date',
    nullable: true,
    transformer: DateTransformer,
  })
  dataConhecimento: Date;

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.doencasRegistradas,
  )
  cadastroClinico: CadastroClinico;

  @ManyToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.cadastrosClinicos,
  )
  medicamentosRegistrados: MedicamentoRegistrado[];
}
