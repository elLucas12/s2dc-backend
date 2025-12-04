import Joi from 'joi';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';
import { ProcAceiteRegistrarDtoSchema } from './ProcAceiteRegistrar.dto';

export const UsuarioAdministrativoAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  nome: Joi.string().max(256).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().max(64).required(),
  nomeDeUsuario: Joi.string().max(64).required(),
  permissao: Joi.string().valid(...Object.values(UsuarioAdministrativoPermissaoEnumModel)).required(),
  procsAceite: Joi.array().items(ProcAceiteRegistrarDtoSchema).optional(),
}).options({
    abortEarly: false
});
