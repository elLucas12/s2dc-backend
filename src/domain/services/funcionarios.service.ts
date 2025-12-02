import { Dependencies, Injectable } from '@nestjs/common';
import { CadastroClinicoInexistenteError } from 'src/adaptInterface/persistence/exceptions/CadastroClinicoInexistenteError';
import { FuncionarioInexistenteError } from 'src/adaptInterface/persistence/exceptions/FuncionarioInexistenteError';
import { CadastroClinicoRepository } from 'src/adaptInterface/persistence/repositories/CadastroClinico.repository';
import { FuncionarioRepository } from 'src/adaptInterface/persistence/repositories/Funcionario.repository';
import { FuncionarioModel } from '../entities/FuncionarioModel.entity';
import { FuncionarioExistenteError } from 'src/adaptInterface/persistence/exceptions/FuncionarioExistenteError';
import { CadastroClinicoModel } from '../entities/CadastroClinicoModel.entity';
import { CadastroClinicoExistenteError } from 'src/adaptInterface/persistence/exceptions/CadastroClinicoExistenteError';

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

  /**
   * Consulta último cadastro clínico de funcionário pelo ID do funcionário.
   * @param id Número de ID do Funcionário.
   * @return Modelo construído da entidade Cadastro Clínico.
   */
  public async consultarCadastroClinicoPorFuncionarioId(id: number) {
    const funcionario = await this.consultarFuncionarioId(id);
    const cadastroClinico = funcionario.cadastrosClinicos.at(-1);
    if (!cadastroClinico) {
      throw new CadastroClinicoInexistenteError(`Entidade 'CadastroClinico' de 'Funcionário' ID ${id} não existe`);
    }
    return cadastroClinico;
  }

  /**
   * Atualiza informações cadastrais de funcionário passado.
   * @param funcionario Informações de funcionário em objeto.
   * @return Modelo construído da entidade.
   */
  public async atualizarFuncionario(funcionario: FuncionarioModel | any) {
    const funcionarioAtualizado = await this.funcionarioRepository.atualizar(funcionario.id, funcionario);
    if (!funcionarioAtualizado) {
      throw new FuncionarioInexistenteError(`Entidade 'Funcionario' ID ${funcionario.id} inexistente`);
    }
    return funcionarioAtualizado;
  }

  /**
   * Salva informações cadastrais de funcionário passado.
   * @param funcionario Informações de funcionário em objeto.
   * @return Modelo construído da entidade.
   */
  public async registrarFuncionario(funcionario: FuncionarioModel | any) {
    const funcionarioAux = await this.funcionarioRepository.consultarId(funcionario.id);
    if (funcionarioAux) {
      throw new FuncionarioExistenteError(`Entidade 'Funcionario' ID ${funcionario.id} já existe no sistema`);
    }
    return await this.funcionarioRepository.registrar(funcionario);
  }

  public async registrarCadastroClinico(cadastroClinico: CadastroClinicoModel | any) {
    const cadastroClinicoAux = await this.cadastroClinicoRepository.registrar(cadastroClinico);
    if (!cadastroClinicoAux) {
      throw new CadastroClinicoExistenteError(`Entidade 'CadastroClinico' "${JSON.stringify(cadastroClinico)}" inexistente`);
    }
  }
}
