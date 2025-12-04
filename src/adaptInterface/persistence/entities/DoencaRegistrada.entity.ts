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
