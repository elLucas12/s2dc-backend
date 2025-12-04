import { Dependencies, Injectable } from '@nestjs/common';
import { CadastroClinicoInexistenteError } from 'src/adaptInterface/persistence/exceptions/CadastroClinicoInexistenteError';
import { FuncionarioInexistenteError } from 'src/adaptInterface/persistence/exceptions/FuncionarioInexistenteError';
import { CadastroClinicoRepository } from 'src/adaptInterface/persistence/repositories/CadastroClinico.repository';
import { FuncionarioRepository } from 'src/adaptInterface/persistence/repositories/Funcionario.repository';
import { FuncionarioModel } from '../entities/FuncionarioModel.entity';
import { FuncionarioExistenteError } from 'src/adaptInterface/persistence/exceptions/FuncionarioExistenteError';
import { CadastroClinicoModel } from '../entities/CadastroClinicoModel.entity';
import { CadastroClinicoExistenteError } from 'src/adaptInterface/persistence/exceptions/CadastroClinicoExistenteError';
import { CirurgiaRegistradaModel } from '../entities/CirurgiaRegistradaModel.entity';
import { CirurgiaRegistradaRepository } from 'src/adaptInterface/persistence/repositories/CirurgiaRegistrada.repository';
import { DoencaRegistradaRepository } from 'src/adaptInterface/persistence/repositories/DoencaRegistrada.repository';
import { AlergiaRegistradaRepository } from 'src/adaptInterface/persistence/repositories/AlergiaRegistrada.repository';
import { MedicamentoRegistradoRepository } from 'src/adaptInterface/persistence/repositories/MedicamentoRegistrado.repository';
import { TipoSanguineoRepository } from 'src/adaptInterface/persistence/repositories/TipoSanguineo.repository';
import { CirurgiaExistenteError } from 'src/adaptInterface/persistence/exceptions/CirurgiaExistenteError';

@Injectable()
@Dependencies(
  FuncionarioRepository,
  CadastroClinicoRepository,
  CirurgiaRegistradaRepository,
  DoencaRegistradaRepository,
  AlergiaRegistradaRepository,
  MedicamentoRegistradoRepository,
  TipoSanguineoRepository,
)
export class ServicoFuncionarios {
  constructor(
    private readonly funcionarioRepository: FuncionarioRepository,
    private readonly cadastroClinicoRepository: CadastroClinicoRepository,
    private readonly cirurgiaRegistradaRepository: CirurgiaRegistradaRepository,
    private readonly doencaRegistradaRepository: DoencaRegistradaRepository,
    private readonly alergiaRegistradaRepository: AlergiaRegistradaRepository,
    private readonly medicamentoRegistradoRepository: MedicamentoRegistradoRepository,
    private readonly tipoSanguineoRepository: TipoSanguineoRepository,
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
    return funcionario;
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
    const funcionarioAux = await this.funcionarioRepository.consultarCpf(funcionario.cpf);
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
    return cadastroClinicoAux;
  }

  /**
   * Salva informações de cirurgia passada por objeto.
   * @param cirurgia Informações de cirurgia em objeto.
   * @return Modelo construído da entidade.
   */
  public async registrarCirurgia(cirurgia: CirurgiaRegistradaModel | any) {
    const cirurgiaAux = await this.cirurgiaRegistradaRepository.consultarId(cirurgia.id);
    if (cirurgiaAux) {
      throw new CirurgiaExistenteError(`Entidade 'Cirurgia' ID ${cirurgia.id} já existe no sistema`);
    }
    return await this.cirurgiaRegistradaRepository.registrar(cirurgia);
  }
}
