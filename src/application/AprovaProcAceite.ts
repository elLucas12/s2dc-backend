import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoAdministrativo } from "src/domain/services/administrativo.service";

@Injectable()
@Dependencies(
  ServicoAdministrativo,
)
export class AprovaProcAceite {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}

  public async run(id: number) {
    const procAceite = await this.servicoAdministrativo.aprovarProcAceite(id);
    return {
      id: procAceite.id,
      cancelado: procAceite.cancelado,
      aprovado: procAceite.aprovado,
      dataFim: procAceite.dataFim,
      dataInicio: procAceite.dataInicio,
      atualizadoEm: procAceite.atualizadoEm,
      criadoEm: procAceite.criadoEm,
    };
  }
}