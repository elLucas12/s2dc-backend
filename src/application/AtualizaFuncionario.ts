import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoAdministrativo } from "src/domain/services/administrativo.service";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
  ServicoAdministrativo,
)
export class AtualizaFuncionario {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}

  public async run(funcionario: any) {
    // Registra processo de aceite com evento inicial caso não exita procAceite
    if (!funcionario.cadastrosClinicos[funcionario.cadastrosClinicos.length-1].procAceite) {
      console.log("Registrando valores iniciais de processo de aceite");
      const procAceiteRegistrado = await this.servicoAdministrativo.registrarProcAceiteInicial();
      funcionario.cadastrosClinicos[funcionario.cadastrosClinicos.length-1].procAceite = procAceiteRegistrado;
    }

    // Atualiza a instância de funcionário
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