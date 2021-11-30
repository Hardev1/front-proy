import { TipoSolicitudModel } from './tipo-solicitud.model';
import { ModalidadModel } from './modalidad.model';
import { LineaInvestigacionModel } from './linea-investigacion.model';
import { EstadoSolicitudModel } from './estado-solicitud.model';

export class SolicitudModel {
    id?: number;
    fecha?: string;    
    nombre_solicitud?: string;
    archivo?: string;
    descripcion?: string;
    id_tipo_solicitud?: number;
    id_estado_solicitud?: number;
    id_modalidad?: number;
    id_linea_investigacion?: number;
    tipoSolicitud?: TipoSolicitudModel;
    modalidad?: ModalidadModel
    lineaInvestigacion?: LineaInvestigacionModel;
} 

