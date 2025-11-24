import Joi from 'joi';

export const UsuarioAdministrativoRegistrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().length(256).required(),
  senha: Joi.string().length(60).required(),
  nomeDeUsuario: Joi.string().required(),
  permissao: Joi.string().required(),
  criadoEm: Joi.date().required(),
  atualizadoEm: Joi.date().required(),
}).options({
    abortEarly: false
});
