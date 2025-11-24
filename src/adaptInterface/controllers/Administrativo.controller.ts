import { Controller } from '@nestjs/common';
import { ServicoAutenticacao } from 'src/domain/services/autenticacao.service';
import { ServicoAdministrativo } from 'src/domain/services/administrativo.service';

@Controller('Administrativo')
export class AdministrativoController {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
    private readonly servicoAutenticacao: ServicoAutenticacao,
  ) {}
}
