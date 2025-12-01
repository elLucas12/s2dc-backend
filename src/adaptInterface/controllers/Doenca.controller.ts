import { Dependencies, Controller, Logger, Get, Post, Bind, Body, UnauthorizedException } from '@nestjs/common';
import { DoencaRegistradaRepository } from '../persistence/repositories/DoencaRegistrada.repository';

@Controller('doenca')
@Dependencies(
  DoencaRegistradaRepository,
)
export class DoencaController {
  private logger = new Logger(DoencaController.name);

  constructor(
    private readonly doencaRepository: DoencaRegistradaRepository,
  ) {}

  @Post('')
  @Bind(Body())
  async postDoenca(@Body() dados: Body) {
    this.logger.log(`[POST] Doença: ${JSON.stringify(dados)}`);
    return await this.doencaRepository.registrar(dados);
  }
}
