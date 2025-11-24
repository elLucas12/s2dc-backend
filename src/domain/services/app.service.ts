import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  isWorking(): string {
    return '<h1>Is Working!</h1>';
  }
}
