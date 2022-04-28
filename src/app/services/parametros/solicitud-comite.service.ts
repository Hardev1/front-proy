import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SolicitudComiteModel } from 'src/app/models/parametros/solicitud-comite.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudComiteService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<SolicitudComiteModel[]> {//chup
    return this.http.get<SolicitudComiteModel[]>(`${this.url}/solicitud-comite`,
    {
      headers:
        new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
    }
    )
  }

  SaveRecord(data: SolicitudComiteModel): Observable<SolicitudComiteModel> {
    return this.http.post<SolicitudComiteModel>(`${this.url}/comites/${data.id_comite}/solicituds`, {
      id_solicitud: data.id_solicitud, 
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }
/**
  SearchRecord(id: number): Observable<SolicitudComiteModel> {
    return this.http.get<SolicitudComiteModel>(`${this.url}/jurado-linea-investigacion/${id}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }
 

  EditRecord(data: SolicitudComiteModel): Observable<SolicitudComiteModel> {
    return this.http.put<SolicitudComiteModel>(
      `${this.url}/jurado-linea-investigacion/${data.id}`,
      {
        id: data.id,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
*/
  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/jurado-linea-investigacion/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
