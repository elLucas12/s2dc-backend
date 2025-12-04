import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
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

  @ManyToMany(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.medicamentosRegistrados,
    {
      eager: false,
      nullable: true,
    },
  )
  cadastrosClinicos: CadastroClinico[];

  @ManyToMany(
    () => AlergiaRegistrada,
    (alergiaRegistrada) => alergiaRegistrada.medicamentosRegistrados,
    {
      eager: false,
      nullable: true,
    },
  )
  alergiasRegistradas: AlergiaRegistrada[];

  @ManyToMany(
    () => CirurgiaRegistrada,
    (cirurgiaRegistrada) => cirurgiaRegistrada.medicamentosRegistrados,
    {
      eager: false,
      nullable: true,
    },
  )
  cirurgiasRegistradas: CirurgiaRegistrada[];

  @ManyToMany(
    () => DoencaRegistrada,
    (doencaRegistrada) => doencaRegistrada.medicamentosRegistrados,
    {
      eager: false,
      nullable: true,
    },
  )
  doencasRegistradas: DoencaRegistrada[];
}
