import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import { MedicamentoRegistrado } from './MedicamentoRegistrado.entity';
import { DateTransformer } from '../date.transformer';

@Entity('CirurgiaRegistrada')
export class CirurgiaRegistrada {
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
  razao: string;

  @Column({
    type: 'date',
    nullable: false,
    transformer: DateTransformer,
  })
  dataOperacao: Date;

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.cirurgiasRegistradas,
  )
  cadastroClinico: CadastroClinico;

  @ManyToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.cadastrosClinicos,
    {
      eager: true,
      cascade: true,
    },
  )
  @JoinTable()
  medicamentosRegistrados: MedicamentoRegistrado[];
}
