import { Controller } from '@nestjs/common';
import { ServicoAdministrativo } from 'src/domain/services/administrativo.service';

@Controller('administrativo')
export class AdministrativoController {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
  ) {}
}
