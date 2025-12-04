import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import {
  TipoSanguineoTipoEnumModel,
  TipoSanguineoFatorRhEnumModel,
} from 'src/domain/entities/TipoSanguineoModel.entity';

@Entity('TipoSanguineo')
export class TipoSanguineo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TipoSanguineoTipoEnumModel,
  })
  tipo: TipoSanguineoTipoEnumModel;

  @Column({
    type: 'enum',
    enum: TipoSanguineoFatorRhEnumModel,
  })
  fatorRh: TipoSanguineoFatorRhEnumModel;

  @OneToMany(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.tipoSanguineo,
    {
      eager: true, // carregar automaticamente com find()
      nullable: true,
      cascade: true,
    },
  )
  cadastrosClinicos: CadastroClinico[];
}
