import { TipoSolicitudModel } from './tipo-solicitud.model';
import { ModalidadModel } from './modalidad.model';
import { LineaInvestigacionModel } from './linea-investigacion.model';

export class SolicitudModel {
    id?: string;
    fecha?: string;
    nombre_solicitud?: string;
    archivo?: string;
    descripcion?: string;
    tiene_un?: TipoSolicitudModel;
    pertenece_a?: ModalidadModel;
    tiene_una?: LineaInvestigacionModel;

    id_tipo_solicitud?: number;
    id_estado_solicitud?: number;
    id_modalidad?: number;
    id_linea_investigacion?: number;
}