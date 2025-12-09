import Joi from "joi";
import { EventoProcAceiteRegistrarDtoSchema } from "./EventoProcAceiteRegistrar.dto";

export const ProcAceiteAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  cancelado: Joi.boolean().optional().strip(),
  aprovado: Joi.boolean().optional().strip(),
  dataFim: Joi.string().isoDate().optional(),
  dataInicio: Joi.string().isoDate().required(),
  eventosProcAceite: Joi.array().items(EventoProcAceiteRegistrarDtoSchema).optional(),
  criadoEm: Joi.string().isoDate().optional().strip(),
  atualizadoEm: Joi.string().isoDate().optional().strip(),
});