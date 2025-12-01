import Joi from 'joi';

export const UsuarioAdministrativoAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  nome: Joi.string().required(),
  email: Joi.string().max(256).required(),
  senha: Joi.string().max(60).required(),
  nomeDeUsuario: Joi.string().required(),
  permissao: Joi.string().required(),
  criadoEm: Joi.date().required(),
  atualizadoEm: Joi.date().required(),
}).options({
    abortEarly: false
});
