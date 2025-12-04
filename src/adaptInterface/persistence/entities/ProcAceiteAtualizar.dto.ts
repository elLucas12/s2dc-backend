import Joi from "joi";
import { EventoProcAceiteRegistrarDtoSchema } from "./EventoProcAceiteRegistrar.dto";

export const ProcAceiteAtualizarDtoSchema = Joi.object({
  id: Joi.number().required(),
  dataFim: Joi.string().isoDate().optional(),
  dataInicio: Joi.string().isoDate().required(),
  eventosProc: Joi.array().items(EventoProcAceiteRegistrarDtoSchema).optional(),
});