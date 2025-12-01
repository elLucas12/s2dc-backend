import { Dependencies, Controller, Logger, Get, Post, Bind, Body, UnauthorizedException, ParseIntPipe, Param } from '@nestjs/common';
import { ProcAceiteRepository } from '../persistence/repositories/ProcAceite.repository';
import { ServicoProcAceite } from 'src/domain/services/ProcAceite.service';

@Controller('procAceite')
@Dependencies(
  ServicoProcAceite,
)
export class AlergiaController {
  private logger = new Logger(AlergiaController.name);

  constructor(
    private readonly servicoProcAceite: ServicoProcAceite,
  ) {}

  @Post('')
  @Bind(Body())
  async postProcAceite(@Body() dados: any) {
    this.logger.log(`[POST] Proc. Aceite: ${JSON.stringify(dados)}`);
    return await this.servicoProcAceite.registrarProcAceite(dados);
  }

  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async getProcAceite(@Param('id') id: number) {
    this.logger.log(`[GET] Proc. Aceite: id=${id}`);
    return await this.servicoProcAceite.consultarProcAceitePorId(id);
  }
  
  @Get(':id/eventos')
  @Bind(Param('id', ParseIntPipe))
  async getEventosProcAceite(@Param('id') id: number) {
    this.logger.log(`[GET] Eventos Proc. Aceite: id=${id}`);
    return await this.servicoProcAceite.consultarEventosProcAceite(id);
  }
}
