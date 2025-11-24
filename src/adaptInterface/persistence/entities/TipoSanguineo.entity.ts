import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';

import { CadastroClinico } from './CadastroClinico.entity';
import {
  TipoSanguineoTipoEnumModel,
  TipoSanguineoFatorRhEnumModel 
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

  @ManyToOne(
    () => CadastroClinico,
    (cadastroClinico) => cadastroClinico.tiposSanguineos,
  )
  cadastroClinico: CadastroClinico;
}
