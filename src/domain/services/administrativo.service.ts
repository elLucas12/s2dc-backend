import { Dependencies, Injectable } from '@nestjs/common';
import { UsuarioAdministrativoInexistenteError } from 'src/adaptInterface/persistence/exceptions/UsuarioAdministrativoInexistenteError';
import { UsuarioAdministrativoRepository } from 'src/adaptInterface/persistence/repositories/UsuarioAdministrativo.repository';
import { UsuarioAdministrativoModel } from '../entities/UsuarioAdministrativoModel.entity';
import { UsuarioAdministrativoExistenteError } from 'src/adaptInterface/persistence/exceptions/UsuarioAdministrativoExistente';

@Injectable()
@Dependencies(
  UsuarioAdministrativoRepository,
)
export class ServicoAdministrativo {
  constructor(
    private readonly usuarioAdministrativoRepository: UsuarioAdministrativoRepository,
  ) {}

  /**
   * Consulta informações cadastrais de usuário administrativo por EMAIL.
   * @param email Endereço de email em string.
   * @return Modelo construído da entidade.
   */
  public async consultarUsuarioAdministrativoEmail(email: string) {
    const usuarioAdministrativo = await this.usuarioAdministrativoRepository.consultarEmail(email)
    if (!usuarioAdministrativo) {
      throw new UsuarioAdministrativoInexistenteError(`Entidade 'UsuarioAdministrativo' EMAIL * inexistente`);
    }
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
    const usuarioAdministrativoAux = await this.usuarioAdministrativoRepository.consultarId(usuarioAdministrativo.id);
    if (usuarioAdministrativoAux) {
      throw new UsuarioAdministrativoExistenteError(`Entidade 'UsuarioAdministrativo' ID ${usuarioAdministrativo.id} já existe no sistema`);
    }
    return await this.usuarioAdministrativoRepository.registrar(usuarioAdministrativo);
  }
}
