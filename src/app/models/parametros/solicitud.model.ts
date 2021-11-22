import { TipoSolicitudModel } from './tipo-solicitud.model';
import { ModalidadModel } from './modalidad.model';
import { LineaInvestigacionModel } from './linea-investigacion.model';
import { EstadoSolicitudModel } from './estado-solicitud.model';

export class SolicitudModel {
    id?: string;
    fecha?: string;
    nombre_solicitud?: string;
    archivo?: string;
    descripcion?: string;
    tiene_un?: TipoSolicitudModel;
    posee_un?: EstadoSolicitudModel;
    pertenece_a?: ModalidadModel;
    tiene_una?: LineaInvestigacionModel;

    id_tipo_solicitud?: number;
    id_estado_solicitud?: number;
    id_modalidad?: number;
    id_linea_investigacion?: number;
}