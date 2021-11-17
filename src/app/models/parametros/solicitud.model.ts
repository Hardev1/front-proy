import { TipoSolicitudModel } from './tipo-solicitud.model';
import { EstadoSolicitudModel } from './estado-solicitud.model';
import { ModalidadModel } from './modalidad.model';
import { LineaInvestigacionModel } from './linea-investigacion.model';

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
}