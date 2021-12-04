import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SolicitudProponenteModel } from 'src/app/models/parametros/solicitud-proponente.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudProponenteService {

  token: string = "";
  url: string = GeneralData.BUSSINESS_URL;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<SolicitudProponenteModel[]> {
    
    return this.http.get<SolicitudProponenteModel[]>(`${this.url}/proponentes?filter={"include":[{"relation":"tiene_un"}]}`);
  }

  SaveRecord(data: SolicitudProponenteModel): Observable<SolicitudProponenteModel> {
    console.log(data);
    
    return this.http.post<SolicitudProponenteModel>(`${this.url}/solicitud-proponente`, {
     id_proponente: data.id_proponente,
     id_solicitud: data.id_solicitud
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<SolicitudProponenteModel> {
    return this.http.get<SolicitudProponenteModel>(`${this.url}/proponentes/${id}`);
  }

  EditRecord(data: SolicitudProponenteModel): Observable<SolicitudProponenteModel> {
    return this.http.put<SolicitudProponenteModel>(
      `${this.url}/proponentes/${data.id}`,
      {
        id: data.id,
        id_proponente: data.id_proponente,
        id_solicitud: data.id_solicitud
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/proponentes/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}