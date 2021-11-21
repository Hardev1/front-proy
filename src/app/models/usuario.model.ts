import { RolModel } from "../modules/shared/modelos/rol.model";

export class UsuarioModel{
    _id?: string;
    nombre?: string;
    apellido?: string;
    documento?: string;
    correo?: string;
    fechaNacimiento?: string;
    celular?: string;
    clave?: string;
    estado?: number;
    rol?: RolModel;
}