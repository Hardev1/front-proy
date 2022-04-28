import { ProponenteModel } from "./proponente.model";
import { DepartamentoModel } from "../departamento.model";

export class DepartamentoProponenteModel {
      id?: number;
      id_proponente?: number;
      id_departamento?: number;

      proponentes?: ProponenteModel;
      departamento?: DepartamentoModel;
}