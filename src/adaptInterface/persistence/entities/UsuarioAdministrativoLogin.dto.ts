import Joi from 'joi';

export const UsuarioAdministrativoLoginDtoSchema = Joi.object({
  email: Joi.string().email().required(),
  senha: Joi.string().max(64).required(),
}).options({
    abortEarly: false
});
