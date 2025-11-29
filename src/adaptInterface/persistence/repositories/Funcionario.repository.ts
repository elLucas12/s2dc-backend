import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { Funcionario } from "../entities/Funcionario.entity";
import { IFuncionarioRepository } from "src/domain/repositories/IFuncionario.repository";
import { FuncionarioModel, FuncionarioSexoEnumModel } from "src/domain/entities/FuncionarioModel.entity";
import { CadastroClinicoModel } from "src/domain/entities/CadastroClinicoModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(Funcionario))
export class FuncionarioRepository implements IFuncionarioRepository {
  constructor(
    private readonly funcionarios: any,
  ) { }

  /**
   * Registrada uma nova instância da entidade Funcionário.
   * @param funcionario Objeto/Model com valores a serem registrados.
   * @returns Model da nova instância armazenada.
   */
  public async registrar(funcionario: FuncionarioModel | any): Promise<FuncionarioModel> {
    const resp = await this.funcionarios.save(funcionario);
    return FuncionarioRepository.createFromObject(resp);
  }

  /**
   * Consulta uma instância da entidade Funcionário por ID.
   * @param id Número de ID da instância.
   * @returns Model da nova instância armazenada.
   */
  public async consultarId(id: number): Promise<FuncionarioModel> {
    const resp = await this.funcionarios.findOneBy({id});
    return FuncionarioRepository.createFromObject(resp);
  }

  /**
   * Consulta uma instância da entidade Funcionário por CPF.
   * @param cpf Número de CPF da instância.
   * @returns Model da nova instância armazenada.
   */
  public async consultarCpf(cpf: string): Promise<FuncionarioModel> {
    const resp = await this.funcionarios.findOne({
      where: {
        cpf: cpf,
      },
    });
    return FuncionarioRepository.createFromObject(resp);
  }

  /**
   * Consulta instâncias da entidade Funcionário por nome/cpf/ctps.
   * @param funcionario Objeto/Model com dados para pesquisa.
   * @returns Model(s) da(s) instância(as) consultada(as).
   */
  public async consultar(funcionario: FuncionarioModel | any): Promise<FuncionarioModel | FuncionarioModel[]> {
    let resp: any;
    if (funcionario.cpf) {
      resp = await this.funcionarios.find({
        where: {
          cpf: Like(`%${funcionario.cpf}%`),
        },
      });
    } else if (funcionario.ctps) {
      resp = await this.funcionarios.find({
        where: {
          ctps: Like(`%${funcionario.ctps}%`),
        }
      });
    } else if (funcionario.nome) {
      resp = await this.funcionarios.find({
        where: {
          nome: Like(`${funcionario.nome}`),
        }
      });
    } 
    return (Array.isArray(resp) ? resp.map(FuncionarioRepository.createFromObject) : FuncionarioRepository.createFromObject(resp));
  }

  /**
   * Atualiza uma instância de Funcionário por ID.
   * @param id Número de ID da instância a ser atualizada.
   * @param funcionario Objeto/Model com novos dados.
   * @returns Model da nova instância armazenada.
   */
  public async atualizar(
    id: number,
    funcionario: FuncionarioModel | any,
  ): Promise<FuncionarioModel> {
    const funcionarioAlvo = await this.funcionarios.findOneBy({id});
    if (!funcionarioAlvo) return funcionarioAlvo;
    const resp = await this.funcionarios.save(funcionario);
    return FuncionarioRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância de Funcionário por seu ID.
   * @param id Número de ID da instância a ser deletada.
   * @returns Model da instância deletada.
   */
  public async deletar(id: number): Promise<FuncionarioModel> {
    const resp = await this.funcionarios.delete(id);
    return FuncionarioRepository.createFromObject(resp);
  }

  /**
   * Recebe um objeto com dados e constrói um objeto Funcionário Model.
   * 
   * @param obj Objeto da entidade Funcionário.
   * @returns Model da entidade Funcionário construido.
   */
  static createFromObject(obj: {
    id: number,
    nome: string,
    cpf: string,
    ctps: string,
    sexo: FuncionarioSexoEnumModel,
    cadastrosClinicos: CadastroClinicoModel[],
    senha: string,
  }) {
    if (!obj) {
      return obj;
    }
    return new FuncionarioModel(
      obj.id,
      obj.nome,
      obj.cpf,
      obj.ctps,
      obj.sexo,
      obj.cadastrosClinicos,
      obj.senha,
    );
  }
}