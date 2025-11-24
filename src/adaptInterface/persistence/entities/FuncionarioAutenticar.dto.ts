import Joi from 'joi';

export const FuncionarioAutenticarDtoSchema = Joi.object({
  cpf: Joi.string().length(11).required(),
  senha: Joi.string().length(64).required(),
}).options({
    abortEarly: false
});
