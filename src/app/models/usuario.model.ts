import { RolModel } from "../modules/shared/modelos/rol.model";

export class UsuarioModel{
    _id?: string;
    nombre?: string;
    apellido?: string;
    documento?: string;
    email?: string;
    fechaNacimiento?: string;
    telefono?: string;
    clave?: string;
    estado?: number;
    rols?: RolModel;
}