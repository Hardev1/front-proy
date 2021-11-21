import { FacultadModel } from "./facultad.model";

export class DepartamentoModel{
    id?: number;
    nombre?: string;
    facultad: FacultadModel = new FacultadModel()
    id_facultad?: number
}