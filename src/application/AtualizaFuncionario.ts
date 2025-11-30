import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
)
export class AtualizaFuncionario {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  public async run(funcionario: any) {
    const funcionarioAtualizado = await this.servicoFuncionarios.atualizarFuncionario(funcionario);
    return {
      id: funcionarioAtualizado.id,
      nome: funcionarioAtualizado.nome,
      senha: funcionarioAtualizado.senha,
      cpf: funcionarioAtualizado.cpf,
      ctps: funcionarioAtualizado.ctps,
      sexo: funcionarioAtualizado.sexo,
      cadastrosClinicos: funcionarioAtualizado.cadastrosClinicos,
    };
  }
}