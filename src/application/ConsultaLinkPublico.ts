import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
)
export class ConsultaLinkPublico {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  public async run(id: number) {
    const linkPublicoAtivo = await this.servicoFuncionarios.consultaLinkPublico(id);
    return {
      linkPublicoAtivo: linkPublicoAtivo
    };
  }
}