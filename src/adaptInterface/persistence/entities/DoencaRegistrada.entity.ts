import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import { MedicamentoRegistrado } from './MedicamentoRegistrado.entity';

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
  })
  dataConhecimento: Date;

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.doencasRegistradas,
  )
  cadastroClinico: CadastroClinico;

  @OneToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.doencaRegistrada,
    {
      eager: true,
      nullable: true,
    },
  )
  medicamentosRegistrados: MedicamentoRegistrado[];
}
