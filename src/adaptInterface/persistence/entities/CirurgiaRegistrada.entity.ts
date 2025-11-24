import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import { MedicamentoRegistrado } from './MedicamentoRegistrado.entity';

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
  })
  dataOperacao: Date;

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.cirurgiasRegistradas,
  )
  cadastroClinico: CadastroClinico;

  @OneToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.cirurgiaRegistrada,
    {
      eager: true,
      nullable: true,
    },
  )
  medicamentosRegistrados: MedicamentoRegistrado[];
}
