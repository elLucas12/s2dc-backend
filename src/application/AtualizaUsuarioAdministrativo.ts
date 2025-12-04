import { Dependencies, Injectable } from "@nestjs/common";
import { UsuarioAdministrativoModel } from "src/domain/entities/UsuarioAdministrativoModel.entity";
import { ServicoAdministrativo } from "src/domain/services/administrativo.service";

@Injectable()
@Dependencies(
  ServicoAdministrativo,
)
export class AtualizaUsuarioAdministrativo {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}

  public async run(usuarioAdministrativo: UsuarioAdministrativoModel | any) {
    const usuarioAdministrativoAtualizado = await this.servicoAdministrativo.atualizarUsuarioAdministrativo(usuarioAdministrativo);
    return {
      id: usuarioAdministrativoAtualizado.id,
      permissao: usuarioAdministrativoAtualizado.permissao,
      nome: usuarioAdministrativoAtualizado.nome,
      senha: usuarioAdministrativoAtualizado.senha,
      nodeDeUsuario: usuarioAdministrativoAtualizado.nomeDeUsuario,
      email: usuarioAdministrativoAtualizado.email,
      procsAceite: usuarioAdministrativoAtualizado.procsAceite,
      criadoEm: usuarioAdministrativoAtualizado.criadoEm,
      atualizadoEm: usuarioAdministrativoAtualizado.atualizadoEm,
    };
  }
}