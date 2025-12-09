import Joi from 'joi';

export const UsuarioAdministrativoLoginDtoSchema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['localhost']
    }
  }).required(),
  // Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
  senha: Joi.string().max(64).required(),
}).options({
    abortEarly: false
});
