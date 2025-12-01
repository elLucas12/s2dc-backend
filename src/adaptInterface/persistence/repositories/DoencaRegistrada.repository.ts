import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";

import { DoencaRegistrada } from "../entities/DoencaRegistrada.entity";
import { IDoencaRegistradaRepository } from "src/domain/repositories/IDoencaRegistrada.repository";
import { DoencaRegistradaModel } from "src/domain/entities/DoencaRegistradaModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(DoencaRegistrada))
export class DoencaRegistradaRepository implements IDoencaRegistradaRepository {
  constructor(
    private readonly doencas: any,
  ) { }

  public async registrar(doenca: DoencaRegistradaModel | any): Promise<DoencaRegistradaModel> {
    const resp = await this.doencas.save(doenca);
    return DoencaRegistradaRepository.createFromObject(resp);
  }

  public async consultarId(id: number): Promise<DoencaRegistradaModel> {
    const resp = await this.doencas.findOneBy({id});
    return DoencaRegistradaRepository.createFromObject(resp);
  }

  public async atualizar(
    id: number,
    doenca: DoencaRegistradaModel | any,
  ): Promise<DoencaRegistradaModel> {
    const doencaAlvo = await this.doencas.findOneBy({id});
    if (!doencaAlvo) return doencaAlvo;
    const resp = await this.doencas.save(doenca);
    return DoencaRegistradaRepository.createFromObject(resp);
  }

  public async deletar(id: number): Promise<DoencaRegistradaModel> {
    const resp = await this.doencas.delete(id);
    return DoencaRegistradaRepository.createFromObject(resp);
  }

  static createFromObject(obj: {
    id: number,
    nome: string,
    cid: string,
    dataConhecimento: Date,
    // medicamentosRegistrados: MedicamentoRegistradoModel[],
  }) {
    if (!obj) {
      return obj;
    }
    return new DoencaRegistradaModel(
      obj.id,
      obj.nome,
      obj.cid,
      obj.dataConhecimento,
      // obj.medicamentosRegistrados,
    );
  }
}