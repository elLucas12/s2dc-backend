import Joi from 'joi';

export const UsuarioAdministrativoLoginDtoSchema = Joi.object({
  email: Joi.string().max(256).required(),
  senha: Joi.string().max(64).required(),
}).options({
    abortEarly: false
});
