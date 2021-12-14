import { JuradoModel } from "./jurado.model";
import { SolicitudModel } from "./solicitud.model";

export class InvitacionEvaluarModel {
    id_jurado?: number;
    id_solicitud?: number;
    id?: number;
    fecha_invitacion?: string;
    fecha_respuesta?: string;
    estado_invitacion?: number;
    observaciones?: string;
    hash?: string;
    
    pertenece_a?: JuradoModel;
    tiene_una?: SolicitudModel;
}