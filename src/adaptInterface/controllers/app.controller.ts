import { Controller, Get } from '@nestjs/common';
import { AppService } from '../../domain/services/app.service';
import { Public } from '../autenticacao/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Public()
  @Get()
  getIsWorking(): string {
    return this.appService.isWorking();
  }
}
