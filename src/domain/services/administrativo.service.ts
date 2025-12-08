import { Dependencies, Injectable } from '@nestjs/common';
import { UsuarioAdministrativoInexistenteError } from 'src/adaptInterface/persistence/exceptions/UsuarioAdministrativoInexistenteError';
import { UsuarioAdministrativoRepository } from 'src/adaptInterface/persistence/repositories/UsuarioAdministrativo.repository';
import { UsuarioAdministrativoModel } from '../entities/UsuarioAdministrativoModel.entity';
import { UsuarioAdministrativoExistenteError } from 'src/adaptInterface/persistence/exceptions/UsuarioAdministrativoExistente';
import { ProcAceiteModel } from '../entities/ProcAceiteModel.entity';
import { ProcAceiteRepository } from 'src/adaptInterface/persistence/repositories/ProcAceite.repository';
import { EventoProcAceiteRepository } from 'src/adaptInterface/persistence/repositories/EventoProcAceite.repository';
import { ProcAceiteExistenteError } from 'src/adaptInterface/persistence/exceptions/ProcAceiteExistenteError';
import { EventoProcAceiteModel } from '../entities/EventoProcAceiteModel.entity';

@Injectable()
@Dependencies(
  UsuarioAdministrativoRepository,
  ProcAceiteRepository,
  EventoProcAceiteRepository,
)
export class ServicoAdministrativo {
  constructor(
    private readonly usuarioAdministrativoRepository: UsuarioAdministrativoRepository,
    private readonly procAceiteRepository: ProcAceiteRepository,
    private readonly eventoProcAceiteRepository: EventoProcAceiteRepository,
  ) {}

  /**
   * Consulta informações cadastrais de usuário administrativo por EMAIL.
   * @param email Endereço de email em string.
   * @return Modelo construído da entidade.
   */
  public async consultarUsuarioAdministrativoEmail(email: string): Promise<UsuarioAdministrativoModel> {
    const usuarioAdministrativo = await this.usuarioAdministrativoRepository.consultarEmail(email)
    if (!usuarioAdministrativo) {
      throw new UsuarioAdministrativoInexistenteError(`Entidade 'UsuarioAdministrativo' EMAIL * inexistente`);
    }
    return usuarioAdministrativo;
  }

  /**
   * Consulta informações cadastrais de usuário administrativo por ID.
   * @param id Número de ID.
   * @return Modelo construído da entidade.
   */
  public async consultarUsuarioAdministrativoId(id: number) {
    const usuarioAdministrativo = await this.usuarioAdministrativoRepository.consultarId(id);
    if (!usuarioAdministrativo) {
      throw new UsuarioAdministrativoInexistenteError(`Entidade 'UsuarioAdministrativo' ID ${id} inexistente`);
    }
    return usuarioAdministrativo;
  }

  // TODO: Consulta ProcAceite (criado repositório para tal)
  // /**
  //  * Consulta Processo de Aceite por seu ID.
  //  * @param id Número de ID do Processo de Aceite.
  //  * @return Modelo construído da entidade ProcAceite.
  //  */
  // public async consultarProcAceiteId(id: number) {
  //   const procAceite = await this.procAceiteRepository.consultarId(id);
  //   if (!procAceite) {
  //     throw new ProcAceiteInexistente(`Entidade 'ProcAceite' ID ${id} inexistente`);
  //   }
  //   return procAceite;
  // }

  /**
   * Consulta um usuário administrativo aleatório e cria um tipo objeto
   * com as informações e estrutura de uma entidade ProcAceite, vinculando-os.
   */
  public async criarObjetoProcAceiteInicial() {
    // Consultando um usuário administrativo aleatório para lidar com 
    // o processo de aceite a ser registrado.
    const randomUsuarioAdministrativo = await this.usuarioAdministrativoRepository.consultarAleatorio();
    if (!randomUsuarioAdministrativo) {
      throw new UsuarioAdministrativoInexistenteError(`Não existem usuários administrativos!`);
    } 

    const objProcAceiteInicial = {
      dataInicio: new Date(),
      dataFim: undefined,
      usuarioAdministrativo: randomUsuarioAdministrativo.id,
      eventosProcAceite: [{
        titulo: "Abertura Processo de Aceite",
        descricao: "Evento de abertura do processo de aceite do Cadastro Clínico",
        corpo: `Responsável pelo processo: ${randomUsuarioAdministrativo.nome}, email: ${randomUsuarioAdministrativo.email}.`,
        data: new Date(),
      }]
    }
    return objProcAceiteInicial;
  }

  /**
   * Atualiza informações cadastrais de usuário administrativo passado.
   * @param usuarioAdministrativo Informações de usuário administrativo em objeto.
   * @return Modelo construído da entidade.
   */
  public async atualizarUsuarioAdministrativo(usuarioAdministrativo: UsuarioAdministrativoModel | any) {
    const usuarioAdministrativoAtualizado = await this.usuarioAdministrativoRepository.atualizar(usuarioAdministrativo.id, usuarioAdministrativo);
    if (!usuarioAdministrativoAtualizado) {
      throw new UsuarioAdministrativoInexistenteError(`Entidade 'UsuarioAdministrativo' ID ${usuarioAdministrativo.id} inexistente`);
    }
    return usuarioAdministrativoAtualizado;
  }

  /**
   * Salva informações cadastrais de usuário administrativo passado.
   * @param usuarioAdministrativo Informações de usuário administrativo em objeto.
   * @return Modelo construído da entidade.
   */
  public async registrarUsuarioAdministrativo(usuarioAdministrativo: UsuarioAdministrativoModel | any) {
    const usuarioAdministrativoAux = await this.usuarioAdministrativoRepository.consultarEmail(usuarioAdministrativo.email);
    if (usuarioAdministrativoAux) {
      throw new UsuarioAdministrativoExistenteError(`Entidade 'UsuarioAdministrativo' ID ${usuarioAdministrativo.id} já existe no sistema`);
    }
    return await this.usuarioAdministrativoRepository.registrar(usuarioAdministrativo);
  }
}
