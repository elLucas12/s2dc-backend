import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoAdministrativo } from "src/domain/services/administrativo.service";

@Injectable()
@Dependencies(
  ServicoAdministrativo,
)
export class ConsultaUsuarioAdministrativoId {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}

  public async run(id: number) {
    const usuarioAdministrativo = await this.servicoAdministrativo.consultarUsuarioAdministrativoId(id);
    return {
      id: usuarioAdministrativo.id,
      permissao: usuarioAdministrativo.permissao,
      nome: usuarioAdministrativo.nome,
      senha: usuarioAdministrativo.senha,
      nodeDeUsuario: usuarioAdministrativo.nomeDeUsuario,
      email: usuarioAdministrativo.email,
      procsAceite: usuarioAdministrativo.procsAceite,
      criadoEm: usuarioAdministrativo.criadoEm,
      atualizadoEm: usuarioAdministrativo.atualizadoEm,
    };
  }
}