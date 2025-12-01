import { Dependencies, Injectable } from '@nestjs/common';
import { ProcAceiteRepository } from 'src/adaptInterface/persistence/repositories/ProcAceite.repository';
import { ProcAceiteModel } from '../entities/ProcAceiteModel.entity';

@Injectable()
@Dependencies(
  ProcAceiteRepository,
)
export class ServicoProcAceite {
  constructor(
    private readonly procAceiteRepository: ProcAceiteRepository,
  ) {}

  public async registrarProcAceite(procAceite: ProcAceiteModel | any) {
    return await this.procAceiteRepository.registrar(procAceite);
  }

  public async consultarProcAceitePorId(id: number) {
    return await this.procAceiteRepository.consultarId(id);
  }

  public async consultarEventosProcAceite(id: number) {
    const procAceite = await this.procAceiteRepository.consultarId(id);
    const eventos = procAceite.eventosProcAceite;
    return eventos;
  }
}
