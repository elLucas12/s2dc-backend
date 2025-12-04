import { UsuarioAdministrativoModel } from '../entities/UsuarioAdministrativoModel.entity';

export interface IUsuarioAdministrativoRepository {
  registrar(
    usuarioAdministrativo: UsuarioAdministrativoModel | any,
  ): Promise<UsuarioAdministrativoModel>;
  consultarId(id: number): Promise<UsuarioAdministrativoModel>;
  consultarEmail(email: string): Promise<UsuarioAdministrativoModel>;
  consultar(
    usuarioAdministrativo: UsuarioAdministrativoModel | any,
  ): Promise<UsuarioAdministrativoModel | UsuarioAdministrativoModel[]>;
  consultarAleatorio(): Promise<UsuarioAdministrativoModel>;
  atualizar(
    id: number,
    usuarioAdministrativo: UsuarioAdministrativoModel | any,
  ): Promise<UsuarioAdministrativoModel>;
  deletar(id: number): Promise<UsuarioAdministrativoModel>;
}
