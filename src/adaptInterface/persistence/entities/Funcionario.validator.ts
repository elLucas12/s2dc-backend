import { BadRequestException } from '@nestjs/common';
import { ObjectSchema } from 'joi';

export class FuncionarioValidatorPipe {
  public schema: ObjectSchema;

  constructor(schema: ObjectSchema) {
    this.schema = schema;
  }

  public transform(value, metadata) {
    const {error} = this.schema.validate(value);
    if (error) {
      const mensagens = error.details.map(d => d.message).join();
      throw new BadRequestException(mensagens);
    }
    return value;
  }
}
