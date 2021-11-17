import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  constructor(
    private http: HttpClient,
  ) { }

  url:string = GeneralData.BUSSINESS_URL;

  GetRecordList(): Observable<SolicitudModel[]>{
    return this.http.get<SolicitudModel[]>(`${this.url}/solicitud?filter={"include":[{"relation":"tiene_una"},{"relation":"posee_un"},{"relation":"pertenece_a"},{"relation":"tiene_un"}]}`);
  }
}
