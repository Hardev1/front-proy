import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { EstadoSolicitudModel } from 'src/app/models/parametros/estado-solicitud.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class EstadoSolicitudService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }



  //CAMBIAR DESPUES DE THIS.URL POR LAS DEL BACKEND Y LOS NOMBRES DE VARIABLES A COMO SE RECIBAN EN LOS 
  //MODELOS DEL BACKEND

  GetRecordList(): Observable<EstadoSolicitudModel[]> {
    return this.http.get<EstadoSolicitudModel[]>(`${this.url}/estado-solicituds`)
  }

  SaveRecord(data: EstadoSolicitudModel): Observable<EstadoSolicitudModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<EstadoSolicitudModel>(`${this.url}/estado-solicituds`, {
      nombre: data.nombre,
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<EstadoSolicitudModel> {
    return this.http.get<EstadoSolicitudModel>(`${this.url}/estado-solicituds/${id}`);
  }

  EditRecord(data: EstadoSolicitudModel): Observable<EstadoSolicitudModel> {
    return this.http.put<EstadoSolicitudModel>(
      `${this.url}/estado-solicituds/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/estado-solicituds/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
