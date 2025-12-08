import Joi from 'joi';
import { FuncionarioSexoEnumModel } from 'src/domain/entities/FuncionarioModel.entity';
import { CadastroClinicoRegistrarDtoSchema } from './CadastroClinicoRegistrar.dto';

export const FuncionarioAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  nome: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  ctps: Joi.string().length(16).required(),
  senha: Joi.string().max(64).required(),
  sexo: Joi.string().valid(...Object.values(FuncionarioSexoEnumModel)).required(),
  cadastrosClinicos: Joi.array().items(CadastroClinicoRegistrarDtoSchema).optional(),
}).options({
    abortEarly: false
});
