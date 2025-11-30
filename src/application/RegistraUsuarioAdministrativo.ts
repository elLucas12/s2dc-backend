import { Dependencies, Injectable } from "@nestjs/common";
import { UsuarioAdministrativoModel } from "src/domain/entities/UsuarioAdministrativoModel.entity";
import { ServicoAdministrativo } from "src/domain/services/administrativo.service";

@Injectable()
@Dependencies(
  ServicoAdministrativo,
)
export class RegistraUsuarioAdministrativo {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}

  public async run(usuarioAdministrativo: UsuarioAdministrativoModel | any) {
    const usuarioAdministrativoRegistrado = await this.servicoAdministrativo.registrarUsuarioAdministrativo(usuarioAdministrativo);
    return {
      id: usuarioAdministrativoRegistrado.id,
      permissao: usuarioAdministrativoRegistrado.permissao,
      nome: usuarioAdministrativoRegistrado.nome,
      senha: usuarioAdministrativoRegistrado.senha,
      nodeDeUsuario: usuarioAdministrativoRegistrado.nomeDeUsuario,
      email: usuarioAdministrativoRegistrado.email,
      criadoEm: usuarioAdministrativoRegistrado.criadoEm,
      atualizadoEm: usuarioAdministrativoRegistrado.atualizadoEm,
    };
  }
}