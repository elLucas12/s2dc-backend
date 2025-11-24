import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { CadastroClinico } from './CadastroClinico.entity';
import { AlergiaRegistrada } from './AlergiaRegistrada.entity';
import { CirurgiaRegistrada } from './CirurgiaRegistrada.entity';
import { DoencaRegistrada } from './DoencaRegistrada.entity';

@Entity('MedicamentoRegistrado')
export class MedicamentoRegistrado {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  nome: string;

  @Column({
    type: 'int',
    nullable: false,
  })
  dosagemMg: number;

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.medicamentosRegistrados,
  )
  cadastroClinico: CadastroClinico;

  @ManyToOne(
    () => AlergiaRegistrada,
    (alergiaRegistrada) => alergiaRegistrada.medicamentosRegistrados,
  )
  alergiaRegistrada: AlergiaRegistrada;

  @ManyToOne(
    () => CirurgiaRegistrada,
    (cirurgiaRegistrada) => cirurgiaRegistrada.medicamentosRegistrados,
  )
  cirurgiaRegistrada: CirurgiaRegistrada;

  @ManyToOne(
    () => DoencaRegistrada,
    (doencaRegistrada) => doencaRegistrada.medicamentosRegistrados,
  )
  doencaRegistrada: DoencaRegistrada;
}
