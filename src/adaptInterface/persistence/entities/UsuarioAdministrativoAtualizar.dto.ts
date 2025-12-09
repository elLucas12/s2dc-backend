import Joi from 'joi';
import { UsuarioAdministrativoPermissaoEnumModel } from 'src/domain/entities/UsuarioAdministrativoModel.entity';
import { ProcAceiteRegistrarDtoSchema } from './ProcAceiteRegistrar.dto';

export const UsuarioAdministrativoAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  nome: Joi.string().max(256).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: {
      allow: ['localhost']
    }
  }).required(),
  senha: Joi.string().max(64).required(),
  nomeDeUsuario: Joi.string().max(64).required(),
  permissao: Joi.string().valid(...Object.values(UsuarioAdministrativoPermissaoEnumModel)).required(),
  procsAceite: Joi.array().items(ProcAceiteRegistrarDtoSchema).optional(),
  criadoEm: Joi.string().isoDate().optional().strip(),
  atualizadoEm: Joi.string().isoDate().optional().strip(),
}).options({
    abortEarly: false
});
