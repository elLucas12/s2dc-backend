import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { CadastroClinico } from "../entities/CadastroClinico.entity";
import { ICadastroClinicoRepository } from "src/domain/repositories/ICadastroClinico.repository";
import { CadastroClinicoModel } from "src/domain/entities/CadastroClinicoModel.entity";
import { ProcAceiteModel } from "src/domain/entities/ProcAceiteModel.entity";
import { MedicamentoRegistradoModel } from "src/domain/entities/MedicamentoRegistradoModel.entity";
import { AlergiaRegistradaModel } from "src/domain/entities/AlergiaRegistradaModel.entity";
import { CirurgiaRegistradaModel } from "src/domain/entities/CirurgiaRegistradaModel.entity";
import { DoencaRegistradaModel } from "src/domain/entities/DoencaRegistradaModel.entity";
import { TipoSanguineoModel } from "src/domain/entities/TipoSanguineoModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(CadastroClinico))
export class CadastroClinicoRepository implements ICadastroClinicoRepository {
  constructor(
    private readonly cadastrosClinicos: any,
  ) { }

  /**
   * Registrada uma nova instância da entidade Cadastro Clínico.
   * @param cadastroClinico Objeto/Model com valores a serem registrados.
   * @returns Model da nova instância armazenada.
   */
  public async registrar(cadastroClinico: CadastroClinicoModel | any): Promise<CadastroClinicoModel> {
    const resp = await this.cadastrosClinicos.save(cadastroClinico);
    return CadastroClinicoRepository.createFromObject(resp);
  }

  /**
   * Consulta uma instância da entidade Cadastro Clínico por ID.
   * @param id Número de ID da instância.
   * @returns Model da nova instância armazenada.
   */
  public async consultarId(id: number): Promise<CadastroClinicoModel> {
    const resp = await this.cadastrosClinicos.findOneBy({id});
    return CadastroClinicoRepository.createFromObject(resp);
  }

  /**
   * Consulta instâncias da entidade Cadastro Clínico por númeroEmergencia/criadoEm/atualizadoEm.
   * @param cadastroClinico Objeto/Model com dados para pesquisa.
   * @returns Model(s) da(s) instância(as) consultada(as).
   */
  public async consultar(cadastroClinico: CadastroClinicoModel | any): Promise<CadastroClinicoModel | CadastroClinicoModel[]> {
    let resp: any;
    if (cadastroClinico.numeroEmergencia) {
      resp = await this.cadastrosClinicos.find({
        where: {
          numeroEmergencia: Like(`%${cadastroClinico.numeroEmergencia}%`),
        },
      });
    } else if (cadastroClinico.criadoEm) {
      resp = await this.cadastrosClinicos.find({
        where: {
          criadoEm: cadastroClinico.criadoEm,
        }
      });
    } else if (cadastroClinico.atualizadoEm) {
      resp = await this.cadastrosClinicos.find({
        where: {
          atualizadoEm: cadastroClinico.atualizadoEm,
        }
      });
    } 
    return (Array.isArray(resp) ? resp.map(CadastroClinicoRepository.createFromObject) : CadastroClinicoRepository.createFromObject(resp));
  }

  /**
   * Atualiza uma instância de Cadastro Clínico por ID.
   * @param id Número de ID da instância a ser atualizada.
   * @param cadastroClinico Objeto/Model com novos dados.
   * @returns Model da nova instância armazenada.
   */
  public async atualizar(
    id: number,
    cadastroClinico: CadastroClinicoModel | any,
  ): Promise<CadastroClinicoModel> {
    const cadastroClinicoAlvo = await this.cadastrosClinicos.findOneBy({id});
    if (!cadastroClinicoAlvo) return cadastroClinicoAlvo;
    const resp = await this.cadastrosClinicos.save(cadastroClinico);
    return CadastroClinicoRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância de Cadastro Clínico por seu ID.
   * @param id Número de ID da instância a ser deletada.
   * @returns Model da instância deletada.
   */
  public async deletar(id: number): Promise<CadastroClinicoModel> {
    const resp = await this.cadastrosClinicos.delete(id);
    return CadastroClinicoRepository.createFromObject(resp);
  }

  /**
   * Recebe um objeto com dados e constrói um objeto Cadastro Clínico Model.
   * 
   * @param obj Objeto da entidade Cadastro Clínico.
   * @returns Model da entidade Cadastro Clínico construido.
   */
  static createFromObject(obj: {
    id: number,
    numeroEmergencia: string,
    linkPublicoAtivo: boolean,
    criadoEm: Date,
    atualizadoEm: Date,
    procAceite: ProcAceiteModel,
    alergiasRegistradas: AlergiaRegistradaModel[],
    cirurgiasRegistradas: CirurgiaRegistradaModel[],
    doencasRegistradas: DoencaRegistradaModel[],
    medicamentosRegistrados: MedicamentoRegistradoModel[],
    tipoSanguineo: TipoSanguineoModel,
  }) {
    if (!obj) {
      return obj;
    }
    return new CadastroClinicoModel(
      obj.id,
      obj.numeroEmergencia,
      obj.linkPublicoAtivo,
      obj.criadoEm,
      obj.atualizadoEm,
      obj.procAceite,
      obj.cirurgiasRegistradas,
      obj.doencasRegistradas,
      obj.medicamentosRegistrados,
      obj.tipoSanguineo,
      obj.alergiasRegistradas,
    );
  }
}