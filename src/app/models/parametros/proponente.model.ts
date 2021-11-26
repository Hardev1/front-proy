import { TipoVinculacionModel } from './tipo-vinculacion.model';

export class ProponenteModel {
 //LO QUE ESTÁ COMENTADO SON LAS VARIABLES DEL BACKEND DEL PROYECTO
    
    /** 
    id?: string;
    primer_nombre?: string;
    otros_nombres?: string;
    primer_apellido?: string;
    segundo_apellido?: string;
    documento?: string;
    fecha_nacimiento?: string;
    email?: string;
    celular?: string;
    fotografia?: string;
    tiene_un?: TipoVinculacionModel;
    id_tipo_vinculacion?: number;
*/
    id?: number;
    primerNombre?: string;
    otrosNombres?: string;    
    primerApellido?: string;
    segundoApellido?: string;
    documento?: string;
    fechaNacimiento?: string;
    correo?: string;
    celular?: string;
    fotografia?: string;
    id_tipoVinculacion?: number;
}