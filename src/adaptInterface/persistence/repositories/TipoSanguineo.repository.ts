import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { ITipoSanguineoRepository } from "src/domain/repositories/ITipoSanguineo.repository";
import { TipoSanguineoFatorRhEnumModel, TipoSanguineoModel, TipoSanguineoTipoEnumModel } from "src/domain/entities/TipoSanguineoModel.entity";
import { TipoSanguineo } from "../entities/TipoSanguineo.entity";

@Injectable()
@Dependencies(getRepositoryToken(TipoSanguineo))
export class TipoSanguineoRepository implements ITipoSanguineoRepository {
  constructor(
    private readonly tiposSanguineos: any,
  ) { }

  public async registrar(tipoSanguineo: TipoSanguineoModel | any): Promise<TipoSanguineoModel> {
    const resp = await this.tiposSanguineos.save(tipoSanguineo);
    return TipoSanguineoRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<TipoSanguineoModel> {
    const resp = await this.tiposSanguineos.findOneBy({id});
    return TipoSanguineoRepository.createFromObject(resp);
  }

  public async consultarParcial(tipoSanguineo: any): Promise<TipoSanguineoModel> {
    const resp = await this.tiposSanguineos.createQueryBuilder('tipoSanguineo')
      .where('tipoSanguineo.tipo = :tipo', { tipo: tipoSanguineo.tipo })
      .andWhere('tipoSanguineo.fatorRh = :fatorRh', { fatorRh: tipoSanguineo.fatorRh })
      .getOne();
    console.log(resp);
    return TipoSanguineoRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    tipoSanguineo: TipoSanguineoModel | any,
  ): Promise<TipoSanguineoModel> {
    const alergiaRegistradaAlvo = await this.tiposSanguineos.findOneBy({id});
    if (!alergiaRegistradaAlvo) return alergiaRegistradaAlvo;
    const resp = await this.tiposSanguineos.save(tipoSanguineo);
    return TipoSanguineoRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<TipoSanguineoModel> {
    const resp = await this.tiposSanguineos.delete(id);
    return TipoSanguineoRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    tipo: TipoSanguineoTipoEnumModel,
    fatorRh: TipoSanguineoFatorRhEnumModel,
  }) {
    if (!obj) {
      return obj;
    }
    return new TipoSanguineoModel(
      obj.id,
      obj.tipo,
      obj.fatorRh
    );
  }
}