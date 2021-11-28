import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { LineaInvestigacionModel } from 'src/app/models/parametros/linea-investigacion.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LineaInvestigacionService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<LineaInvestigacionModel[]> {
    return this.http.get<LineaInvestigacionModel[]>(`${this.url}/linea-investigacion`)
  }

  SaveRecord(data: LineaInvestigacionModel): Observable<LineaInvestigacionModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<LineaInvestigacionModel>(`${this.url}/linea-investigacions`, {
      nombre: data.nombre,
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<LineaInvestigacionModel> {
    return this.http.get<LineaInvestigacionModel>(`${this.url}/linea-investigacion/${id}`);
  }

  EditRecord(data: LineaInvestigacionModel): Observable<LineaInvestigacionModel> {
    return this.http.put<LineaInvestigacionModel>(
      `${this.url}/linea-investigacion/${data.id}`,
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
      `${this.url}/linea-investigacion/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
