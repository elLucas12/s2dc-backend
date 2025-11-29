import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
)
export class ConsultaFuncionarioId {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  public async run(id: number) {
    const funcionario = await this.servicoFuncionarios.consultarFuncionarioId(id);
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      senha: funcionario.senha,
      cpf: funcionario.cpf,
      ctps: funcionario.ctps,
      sexo: funcionario.sexo,
      cadastrosClinicos: funcionario.cadastrosClinicos,
    };
  }
}