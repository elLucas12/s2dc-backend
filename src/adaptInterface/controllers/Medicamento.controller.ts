import { Dependencies, Controller, Logger, Get, Post, Bind, Body, UnauthorizedException } from '@nestjs/common';
import { AlergiaRegistradaRepository } from '../persistence/repositories/AlergiaRegistrada.repository';
import { MedicamentoRegistradoRepository } from '../persistence/repositories/MedicamentoRegistrado.repository';

@Controller('medicamento')
@Dependencies(
  MedicamentoRegistradoRepository,
)
export class MedicamentoController {
  private logger = new Logger(MedicamentoController.name);

  constructor(
    private readonly medicamentoRepository: MedicamentoRegistradoRepository,
  ) {}

  @Post('')
  @Bind(Body())
  async postMedicamento(@Body() dados: Body) {
    this.logger.log(`[POST] Medicamento: ${JSON.stringify(dados)}`);
    return await this.medicamentoRepository.registrar(dados);
  }
}
