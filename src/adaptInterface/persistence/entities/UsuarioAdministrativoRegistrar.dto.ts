import Joi from 'joi';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';

export const UsuarioAdministrativoRegistrarDtoSchema = Joi.object({
  nome: Joi.string().required(),
  email: Joi.string().email().required(),
  senha: Joi.string().max(60).required(),
  nomeDeUsuario: Joi.string().required(),
  permissao: Joi.string().valid(...Object.values(UsuarioAdministrativoPermissaoEnumModel)).required(),
}).options({
    abortEarly: false
});
