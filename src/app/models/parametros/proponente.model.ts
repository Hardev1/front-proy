import { TipoVinculacionModel } from './tipo-vinculacion.model';

export class ProponenteModel {
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
}