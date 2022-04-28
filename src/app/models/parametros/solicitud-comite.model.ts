import { SolicitudModel } from "./solicitud.model";
import { ComiteModel } from "./comite.model";

export class SolicitudComiteModel {
      id?: number;
      id_solicitud?: number;
      id_comite?: number;

      solicituds?: SolicitudModel;
      comite?: ComiteModel;
}