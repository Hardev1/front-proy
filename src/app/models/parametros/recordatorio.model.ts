import { InvitacionEvaluarModel } from './invitacion-evaluar.model';


export class RecordatorioModel {
    id?: number;
    fecha?: string;   
    tipo_recordatorio?: string;
    descripcion?: string;
    id_invitacion_evaluar?: number;

    invitacionEvaluar?:InvitacionEvaluarModel;
} 
