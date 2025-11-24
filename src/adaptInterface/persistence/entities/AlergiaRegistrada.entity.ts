import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import { MedicamentoRegistrado } from './MedicamentoRegistrado.entity';

@Entity('AlergiaRegistrada')
export class AlergiaRegistrada {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nome: string;

  @Column({
    type: 'varchar',
    nullable: true,
  })
  alimentosRelacionados: string;

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.alergiasRegistradas,
  )
  cadastroClinico: CadastroClinico;

  @OneToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.alergiaRegistrada,
    {
      eager: true,
      nullable: true,
    },
  )
  medicamentosRegistrados: MedicamentoRegistrado[];
}
