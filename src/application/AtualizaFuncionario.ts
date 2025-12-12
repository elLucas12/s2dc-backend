import { Dependencies, ForbiddenException, Injectable } from "@nestjs/common";
import { UsuarioAdministrativoInexistenteError } from "src/adaptInterface/persistence/exceptions/UsuarioAdministrativoInexistenteError";
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
    if (!(await this.servicoFuncionarios.temCadastroClinico(funcionario.id))) {
      try {
        console.log(`[*] Criando novo Cadastro Clínico para ID ${JSON.stringify(funcionario.id)}`);
        console.log("[*] Registrando valores iniciais de processo de aceite");

        // Criando procAceite inicial para novo cadastro
        const procAceiteRegistrado = await this.servicoAdministrativo.criarObjetoProcAceiteInicial();
        let cad = funcionario.cadastrosClinicos[funcionario.cadastrosClinicos.length-1];
        cad = { ...cad, procAceite: procAceiteRegistrado };
        cad.tipoSanguineo = await this.servicoFuncionarios.consultarIdTipoSanguineo(cad.tipoSanguineo);
        funcionario.cadastrosClinicos[funcionario.cadastrosClinicos.length-1] = cad;
      } catch (error) {
        if (error instanceof UsuarioAdministrativoInexistenteError) {
          throw new ForbiddenException(`Falha na criação de novo cadastro clínico`, {
            cause: error,
          });
        }
        throw error;
      }
    } else if (funcionario.cadastrosClinicos[funcionario.cadastrosClinicos.length-1]) {
      let cad = funcionario.cadastrosClinicos[funcionario.cadastrosClinicos.length-1];
      cad.tipoSanguineo = await this.servicoFuncionarios.consultarIdTipoSanguineo(cad.tipoSanguineo);
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
      chaveAlfanumerica: funcionarioAtualizado.chaveAlfanumerica,
      cadastrosClinicos: funcionarioAtualizado.cadastrosClinicos,
    };
  }
}