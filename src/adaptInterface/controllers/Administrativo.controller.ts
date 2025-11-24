import { Controller } from '@nestjs/common';
import { ServicoAdministrativo } from 'src/domain/services/administrativo.service';
import { ServicoAutenticacao } from '../autenticacao/autenticacao.service';

@Controller('Administrativo')
export class AdministrativoController {
  constructor(
    private readonly servicoAdministrativo: ServicoAdministrativo,
    private readonly servicoAutenticacao: ServicoAutenticacao,
  ) {}
}
