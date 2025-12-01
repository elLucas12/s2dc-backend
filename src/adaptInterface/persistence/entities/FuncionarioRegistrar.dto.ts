import Joi from 'joi';

export const FuncionarioRegistrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  ctps: Joi.string().length(16).required(),
  senha: Joi.string().max(64).required(),
  sexo: Joi.string().required(),
}).options({
    abortEarly: false
});
