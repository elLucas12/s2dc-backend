import { Dependencies, Controller, Logger, Get, Post, Bind, Body, UnauthorizedException } from '@nestjs/common';
import { AlergiaRegistradaRepository } from '../persistence/repositories/AlergiaRegistrada.repository';

@Controller('alergia')
@Dependencies(
  AlergiaRegistradaRepository,
)
export class AlergiaController {
  private logger = new Logger(AlergiaController.name);

  constructor(
    private readonly alergiaRepository: AlergiaRegistradaRepository,
  ) {}

  @Post('')
  @Bind(Body())
  async postAlergia(@Body() dados: Body) {
    this.logger.log(`[POST] Alergia: ${JSON.stringify(dados)}`);
    return await this.alergiaRepository.registrar(dados);
  }
}
