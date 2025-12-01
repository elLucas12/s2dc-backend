import { Dependencies, Controller, Logger, Get, Post, Bind, Body, UnauthorizedException } from '@nestjs/common';
import { TipoSanguineoRepository } from '../persistence/repositories/TipoSanguineo.repository';

@Controller('tipoSanguineo')
@Dependencies(
  TipoSanguineoRepository,
)
export class TipoSanguineoController {
  private logger = new Logger(TipoSanguineoController.name);

  constructor(
    private readonly tipoSanguineoRepository: TipoSanguineoRepository,
  ) {}

  @Post('')
  @Bind(Body())
  async postTipoSanguineo(@Body() dados: Body) {
    this.logger.log(`[POST] Tipo Sanguineo: ${JSON.stringify(dados)}`);
    return await this.tipoSanguineoRepository.registrar(dados);
  }
}
