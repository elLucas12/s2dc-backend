import Joi from 'joi';
import { FuncionarioSexoEnumModel } from 'src/domain/entities/FuncionarioModel.entity';

export const FuncionarioRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().max(256).required(),
  cpf: Joi.string().length(11).required(),
  ctps: Joi.string().length(16).required(),
  senha: Joi.string().max(64).required(),
  sexo: Joi.string().valid(...Object.values(FuncionarioSexoEnumModel)),
}).options({
    abortEarly: false
});
