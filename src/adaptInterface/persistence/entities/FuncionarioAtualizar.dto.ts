import Joi from 'joi';

export const FuncionarioAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  nome: Joi.string().required(),
  cpf: Joi.string().length(11).required(),
  ctps: Joi.string().length(16).required(),
  senha: Joi.string().max(64).required(),
  sexo: Joi.string().required(),
  cadastrosClinicos: Joi.required(),
}).options({
    abortEarly: false
});
