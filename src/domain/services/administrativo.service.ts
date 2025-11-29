import { Dependencies, Injectable } from '@nestjs/common';
import { UsuarioAdministrativoRepository } from 'src/adaptInterface/persistence/repositories/UsuarioAdministrativo.repository';

@Injectable()
@Dependencies(
  UsuarioAdministrativoRepository
)
export class ServicoAdministrativo {
  constructor(
    private readonly usuarioAdministrativoRepository: UsuarioAdministrativoRepository,
  ) {}

  /**
   * Consulta informações cadastrais de usuário administrativo por ID.
   * @param id Número de ID.
   * @return Modelo construído da entidade.
   */
  public async consultarUsuarioAdministrativo(id: number) {
    return await this.usuarioAdministrativoRepository.consultarId(id);
  }
}
