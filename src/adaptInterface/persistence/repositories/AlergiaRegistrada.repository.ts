import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { IAlergiaRegistradaRepository } from "src/domain/repositories/IAlergiaRegistrada.repository";
import { AlergiaRegistradaModel } from "src/domain/entities/AlergiaRegistradaModel.entity";
import { AlergiaRegistrada } from "../entities/AlergiaRegistrada.entity";

@Injectable()
@Dependencies(getRepositoryToken(AlergiaRegistrada))
export class AlergiaRegistradaRepository implements IAlergiaRegistradaRepository {
  constructor(
    private readonly alergiasRegistradas: any,
  ) { }

  public async registrar(alergiaRegistrada: AlergiaRegistradaModel | any): Promise<AlergiaRegistradaModel> {
    const resp = await this.alergiasRegistradas.save(alergiaRegistrada);
    return AlergiaRegistradaRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<AlergiaRegistradaModel> {
    const resp = await this.alergiasRegistradas.findOneBy({id});
    return AlergiaRegistradaRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    alergiaRegistrada: AlergiaRegistradaModel | any,
  ): Promise<AlergiaRegistradaModel> {
    const alergiaRegistradaAlvo = await this.alergiasRegistradas.findOneBy({id});
    if (!alergiaRegistradaAlvo) return alergiaRegistradaAlvo;
    const resp = await this.alergiasRegistradas.save(alergiaRegistrada);
    return AlergiaRegistradaRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<AlergiaRegistradaModel> {
    const resp = await this.alergiasRegistradas.delete(id);
    return AlergiaRegistradaRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    nome: string,
    alimentosRelacionados: string,
    // medicamentosRegistrados: MedicamentoRegistradoModel[],
  }) {
    if (!obj) {
      return obj;
    }
    return new AlergiaRegistradaModel(
      obj.id,
      obj.nome,
      obj.alimentosRelacionados,
      // obj.medicamentosRegistrados,
    );
  }
}