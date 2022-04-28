import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { JuradoLineaInvestigacionModel } from 'src/app/models/parametros/jurado-linea-investigacion.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JuradoLineaInvestigacionService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<JuradoLineaInvestigacionModel[]> {
    return this.http.get<JuradoLineaInvestigacionModel[]>(`${this.url}/jurado-linea-investigacion`,
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SaveRecord(data: JuradoLineaInvestigacionModel): Observable<JuradoLineaInvestigacionModel> {
    return this.http.post<JuradoLineaInvestigacionModel>(`${this.url}/jurado-linea-investigacion`, {
      id_jurado: data.id_jurado,
      id_linea_investigacion: data.id_linea_investigacion
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<JuradoLineaInvestigacionModel> {
    return this.http.get<JuradoLineaInvestigacionModel>(`${this.url}/jurado-linea-investigacion/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }


  EditRecord(data: JuradoLineaInvestigacionModel): Observable<JuradoLineaInvestigacionModel> {
    return this.http.put<JuradoLineaInvestigacionModel>(
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

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/jurado-linea-investigacion/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
