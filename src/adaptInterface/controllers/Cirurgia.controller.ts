import { Dependencies, Controller, Logger, Get, Post, Bind, Body, UnauthorizedException } from '@nestjs/common';
import { CirurgiaRegistradaRepository } from '../persistence/repositories/CirurgiaRegistrada.repository';

@Controller('cirurgia')
@Dependencies(
  CirurgiaRegistradaRepository,
)
export class CirurgiaController {
  private logger = new Logger(CirurgiaController.name);

  constructor(
    private readonly cirurgiaRepository: CirurgiaRegistradaRepository,
  ) {}

  @Post('')
  @Bind(Body())
  async postCirurgia(@Body() dados: Body) {
    this.logger.log(`[POST] Cirurgia: ${JSON.stringify(dados)}`);
    return await this.cirurgiaRepository.registrar(dados);
  }
}
