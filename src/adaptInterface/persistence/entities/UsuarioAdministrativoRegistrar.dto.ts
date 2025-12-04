import Joi from 'joi';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';

export const UsuarioAdministrativoRegistrarDtoSchema = Joi.object({
  id: Joi.number().optional(),
  nome: Joi.string().max(256).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().max(64).required(),
  nomeDeUsuario: Joi.string().max(64).required(),
  permissao: Joi.string().valid(...Object.values(UsuarioAdministrativoPermissaoEnumModel)).required(),
}).options({
    abortEarly: false
});
