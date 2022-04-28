import { JuradoModel } from "./jurado.model";
import { LineaInvestigacionModel } from "./linea-investigacion.model";

export class JuradoLineaInvestigacionModel {
      id?: number;
      id_jurado?: number;
      id_linea_investigacion?: number;

      jurados?: JuradoModel;
      linea_investigacion?: LineaInvestigacionModel;
}