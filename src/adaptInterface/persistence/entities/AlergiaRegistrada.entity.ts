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

  @ManyToMany(
    () => MedicamentoRegistrado,
    (medicamentoRegistrado) => medicamentoRegistrado.cadastrosClinicos,
    {
      eager: true,
      cascade: true,
    }
  )
  @JoinTable()
  medicamentosRegistrados: MedicamentoRegistrado[];
}
