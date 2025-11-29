import { Controller, Dependencies, Get, Bind, Param, ParseIntPipe } from '@nestjs/common';
import { ConsultaUsuarioAdministrativoId } from 'src/application/ConsultaUsuarioAdministrativoId';
import { User } from '../decorators/user.decorator';

@Controller('administrativo')
@Dependencies(
  ConsultaUsuarioAdministrativoId,
)
export class AdministrativoController {
  constructor(
    private readonly consultaUsuarioAdministrativoId: ConsultaUsuarioAdministrativoId,
  ) {}

  @Get('')
  async getUsuarioAdministrativo(@User() user: any) {
    return await this.consultaUsuarioAdministrativoId.run(user.userid);
  }

  @Get(':id')
  @Bind(Param('id', ParseIntPipe))
  async getInformacoesCadastrais(id: number) {
    return await this.consultaUsuarioAdministrativoId.run(id);
  }
}
