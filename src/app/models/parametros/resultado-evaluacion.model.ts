import { InvitacionEvaluarModel } from './invitacion-evaluar.model';

export class ResultadoEvaluacionModel {
    id?: number;
    fecha?: string;
    formato_diligenciado?: string;
    descripcion?: string;
    id_invitacion_evaluar?: number;


    lineaInvestigacion?: InvitacionEvaluarModel;
} 
