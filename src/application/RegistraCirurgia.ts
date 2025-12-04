import { Dependencies, Injectable } from "@nestjs/common";
import { ServicoFuncionarios } from "src/domain/services/funcionarios.service";

@Injectable()
@Dependencies(
  ServicoFuncionarios,
)
export class RegistraCirurgia {
  constructor(
    private readonly servicoFuncionarios: ServicoFuncionarios,
  ) {}

  public async run(cirurgia: any) {
    const cirurgiaRegistrada = await this.servicoFuncionarios.registrarCirurgia(cirurgia);
    return {
      id: cirurgiaRegistrada.id,
      nome: cirurgiaRegistrada.nome,
      razao: cirurgiaRegistrada.razao,
      dataOperacao: cirurgiaRegistrada.dataOperacao,
      // medicamentosRegistrados: cirurgiaRegistrada.medicamentosRegistrados,
    };
  }
}