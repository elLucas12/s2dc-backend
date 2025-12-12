import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
)
export class ConsultaInformacoesPublicas {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  public async run(id: number, chaveAlfanumerica: string) {
    const funcionarioAux = await this.servicoFuncionarios.ChaveAlfanumericaValida(id, chaveAlfanumerica);
    return { 
      id: funcionarioAux.id,
      nome: funcionarioAux.nome,
      sexo: funcionarioAux.sexo,
      cadastrosClinicos: [funcionarioAux.cadastrosClinicos.at(-1)],
    };
  }
}