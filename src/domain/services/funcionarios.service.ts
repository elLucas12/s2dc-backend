import { Dependencies, Injectable } from '@nestjs/common';
import { CadastroClinicoInexistenteError } from 'src/adaptInterface/persistence/exceptions/CadastroClinicoInexistenteError';
import { FuncionarioInexistenteError } from 'src/adaptInterface/persistence/exceptions/FuncionarioInexistenteError';
import { CadastroClinicoRepository } from 'src/adaptInterface/persistence/repositories/CadastroClinico.repository';
import { FuncionarioRepository } from 'src/adaptInterface/persistence/repositories/Funcionario.repository';

@Injectable()
@Dependencies(
  FuncionarioRepository,
  CadastroClinicoRepository,
)
export class ServicoFuncionarios {
  constructor(
    private readonly funcionarioRepository: FuncionarioRepository,
    private readonly cadastroClinicoRepository: CadastroClinicoRepository,
  ) {}

  /**
   * Consulta informações cadastrais de funcionário por CPF.
   * @param cpf Número de CPF em string.
   * @return Modelo construído da entidade.
   */
  public async consultarFuncionarioCpf(cpf: string) {
    const funcionario = await this.funcionarioRepository.consultarCpf(cpf);
    if (!funcionario) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' CPF * inexistente`);
    }
  }

  /**
   * Consulta informações cadastrais de funcionário por ID.
   * @param id Número de ID.
   * @return Modelo construído da entidade.
   */
  public async consultarFuncionarioId(id: number) {
    const funcionario = await this.funcionarioRepository.consultarId(id);
    if (!funcionario) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' ID ${id} inexistente`);
    }
    return funcionario;
  }

  /**
   * Consulta cadastro clínico por seu ID.
   * @param id Número de ID do Cadastro Clínico.
   * @return Modelo construído da entidade Cadastro Clínico.
   */
  public async consultarCadastroClinicoId(id: number) {
    const cadastroClinico = await this.cadastroClinicoRepository.consultarId(id);
    if (!cadastroClinico) {
      throw new CadastroClinicoInexistenteError(`Entidade 'CadastroClinico' ID ${id} inexistente`);
    }
    return cadastroClinico;
  }
}
