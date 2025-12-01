import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { ICirurgiaRegistradaRepository } from "src/domain/repositories/ICirurgiaRegistrada.repository";
import { CirurgiaRegistrada } from "../entities/CirurgiaRegistrada.entity";
import { CirurgiaRegistradaModel } from "src/domain/entities/CirurgiaRegistradaModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(CirurgiaRegistrada))
export class CirurgiaRegistradaRepository implements ICirurgiaRegistradaRepository {
  constructor(
    private readonly cirurgias: any,
  ) { }

  public async registrar(cirurgia: CirurgiaRegistradaModel | any): Promise<CirurgiaRegistradaModel> {
    const resp = await this.cirurgias.save(cirurgia);
    return CirurgiaRegistradaRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<CirurgiaRegistradaModel> {
    const resp = await this.cirurgias.findOneBy({id});
    return CirurgiaRegistradaRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    cirurgia: CirurgiaRegistradaModel | any,
  ): Promise<CirurgiaRegistradaModel> {
    const cirurgiaAlvo = await this.cirurgias.findOneBy({id});
    if (!cirurgiaAlvo) return cirurgiaAlvo;
    console.log("cirurgiaAlvo => ", cirurgiaAlvo);
    console.log("Obj => ", CirurgiaRegistradaRepository.createFromObject(cirurgia));
    const resp = await this.cirurgias.save(cirurgia);
    console.log("resp => ", resp);
    return CirurgiaRegistradaRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<CirurgiaRegistradaModel> {
    const resp = await this.cirurgias.delete(id);
    return CirurgiaRegistradaRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    nome: string,
    razao: string,
    dataOperacao: Date,
    // medicamentosRegistrados: MedicamentoRegistradoModel[],
  }) {
    if (!obj) {
      return obj;
    }
    return new CirurgiaRegistradaModel(
      obj.id,
      obj.nome,
      obj.razao,
      obj.dataOperacao,
      // obj.medicamentosRegistrados,
    );
  }
}