import Joi from 'joi';

export const FuncionarioLoginDtoSchema = Joi.object({
  cpf: Joi.string().length(11).required(),
  senha: Joi.string().max(64).required(),
}).options({
    abortEarly: false
});
