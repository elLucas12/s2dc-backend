export enum TipoSanguineoTipoEnumModel {
  A = 'A',
  B = 'B',
  AB = 'AB',
  O = 'O',
}

export enum TipoSanguineoFatorRhEnumModel {
  POS = 'Positivo',
  NEG = 'Negativo',
}

export class TipoSanguineoModel {
  id: number;
  tipo: TipoSanguineoTipoEnumModel;
  fatorRh: TipoSanguineoFatorRhEnumModel;

  constructor(
    id: number,
    tipo: TipoSanguineoTipoEnumModel,
    fatorRh: TipoSanguineoFatorRhEnumModel,
  ) {
    this.id = id;
    this.tipo = tipo;
    this.fatorRh = fatorRh;
  }
}
