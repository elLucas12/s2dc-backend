import { Injectable, Dependencies } from "@nestjs/common";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Like } from "typeorm";

import { UsuarioAdministrativo } from "../entities/UsuarioAdministrativo.entity";
import { IUsuarioAdministrativoRepository } from "src/domain/repositories/IUsuarioAdministrativo.repository";
import { UsuarioAdministrativoModel, UsuarioAdministrativoPermissaoEnumModel } from "src/domain/entities/UsuarioAdministrativoModel.entity";
import { ProcAceiteModel } from "src/domain/entities/ProcAceiteModel.entity";

@Injectable()
@Dependencies(getRepositoryToken(UsuarioAdministrativo))
export class UsuarioAdministrativoRepository implements IUsuarioAdministrativoRepository {
  constructor(
    private readonly usuariosAdministrativos: any,
  ) { }

  /**
   * Registrada uma nova instância da entidade Usuário Administrativo.
   * @param usuarioAdministrativo Objeto/Model com valores a serem registrados.
   * @returns Model da nova instância armazenada.
   */
  public async registrar(usuarioAdministrativo: UsuarioAdministrativoModel | any): Promise<UsuarioAdministrativoModel> {
    const resp = await this.usuariosAdministrativos.save(usuarioAdministrativo);
    return UsuarioAdministrativoRepository.createFromObject(resp);
  }

  /**
   * Consulta uma instância da entidade Usuário Administrativo por ID.
   * @param id Número de ID da instância.
   * @returns Model da nova instância armazenada.
   */
  public async consultarId(id: number): Promise<UsuarioAdministrativoModel> {
    const resp = await this.usuariosAdministrativos.findOneBy({id});
    return UsuarioAdministrativoRepository.createFromObject(resp);
  }

  /**
   * Consulta uma instância da entidade Usuário Administrativo por Email.
   * @param email Endereço de email a ser consultado.
   * @returns Model da nova instância armazenada.
   */
  public async consultarEmail(email: string): Promise<UsuarioAdministrativoModel> {
    const resp = await this.usuariosAdministrativos.findOneBy({email});
    return UsuarioAdministrativoRepository.createFromObject(resp);
  }

  /**
   * Consulta instâncias da entidade Usuário Administrativo por nome/cpf/ctps.
   * @param usuarioAdministrativo Objeto/Model com dados para pesquisa.
   * @returns Model(s) da(s) instância(as) consultada(as).
   */
  public async consultar(usuarioAdministrativo: UsuarioAdministrativoModel | any): Promise<UsuarioAdministrativoModel | UsuarioAdministrativoModel[]> {
    let resp: any;
    if (usuarioAdministrativo.nome) {
      resp = await this.usuariosAdministrativos.find({
        where: {
          nome: Like(`%${usuarioAdministrativo.nome}%`),
        },
      });
    } else if (usuarioAdministrativo.nomeDeUsuario) {
      resp = await this.usuariosAdministrativos.find({
        where: {
          nomeDeUsuario: Like(`%${usuarioAdministrativo.nomeDeUsuario}%`),
        }
      });
    } else if (usuarioAdministrativo.email) {
      resp = await this.usuariosAdministrativos.find({
        where: {
          email: Like(`${usuarioAdministrativo.email}`),
        }
      });
    } 
    return (Array.isArray(resp) ? resp.map(UsuarioAdministrativoRepository.createFromObject) : UsuarioAdministrativoRepository.createFromObject(resp));
  }

  public async consultarAleatorio(): Promise<UsuarioAdministrativoModel> {
    const randomUsuarioAdministrativo = await this.usuariosAdministrativos
      .createQueryBuilder()
      .orderBy("RAND()")
      .getOne();
    return randomUsuarioAdministrativo;
  }

  /**
   * Atualiza uma instância de Usuário Administrativo por ID.
   * @param id Número de ID da instância a ser atualizada.
   * @param usuarioAdministrativo Objeto/Model com novos dados.
   * @returns Model da nova instância armazenada.
   */
  public async atualizar(
    id: number,
    usuarioAdministrativo: UsuarioAdministrativoModel | any,
  ): Promise<UsuarioAdministrativoModel> {
    const usuarioAdministrativoAlvo = await this.usuariosAdministrativos.findOneBy({id});
    if (!usuarioAdministrativoAlvo) return usuarioAdministrativoAlvo;
    const resp = await this.usuariosAdministrativos.save(usuarioAdministrativo);
    return UsuarioAdministrativoRepository.createFromObject(resp);
  }

  /**
   * Deleta uma instância de Usuário Administrativo por seu ID.
   * @param id Número de ID da instância a ser deletada.
   * @returns Model da instância deletada.
   */
  public async deletar(id: number): Promise<UsuarioAdministrativoModel> {
    const resp = await this.usuariosAdministrativos.delete(id);
    return UsuarioAdministrativoRepository.createFromObject(resp);
  }

  /**
   * Recebe um objeto com dados e constrói um objeto Funcionário Model.
   * 
   * @param obj Objeto da entidade Funcionário.
   * @returns Model da entidade Funcionário construido.
   */
  static createFromObject(obj: {
    id: number,
    permissao: UsuarioAdministrativoPermissaoEnumModel,
    nome: string,
    senha: string,
    nomeDeUsuario: string,
    email: string,
    procsAceite: ProcAceiteModel[],
    criadoEm: Date,
    atualizadoEm: Date,
  }) {
    if (!obj) {
      return obj;
    }
    return new UsuarioAdministrativoModel(
      obj.id,
      obj.permissao,
      obj.nome,
      obj.senha,
      obj.nomeDeUsuario,
      obj.email,
      obj.procsAceite,
      obj.criadoEm,
      obj.atualizadoEm,
    );
  }
}