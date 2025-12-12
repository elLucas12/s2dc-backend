import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
)
export class RegistraFuncionario {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  public async run(funcionario: any) {
    const funcionarioRegistrado = await this.servicoFuncionarios.registrarFuncionario(funcionario);
    return {
      id: funcionarioRegistrado.id,
      nome: funcionarioRegistrado.nome,
      senha: funcionarioRegistrado.senha,
      cpf: funcionarioRegistrado.cpf,
      ctps: funcionarioRegistrado.ctps,
      sexo: funcionarioRegistrado.sexo,
      chaveAlfanumerica: funcionarioRegistrado.chaveAlfanumerica,
      cadastrosClinicos: funcionarioRegistrado.cadastrosClinicos,
    };
  }
}