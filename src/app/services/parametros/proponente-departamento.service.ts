import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartamentoProponenteModel } from 'src/app/models/parametros/proponente-departamento.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoProponenteService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<DepartamentoProponenteModel[]> {
    return this.http.get<DepartamentoProponenteModel[]>(`${this.url}/departamento-proponente`,
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SaveRecord(data: DepartamentoProponenteModel): Observable<DepartamentoProponenteModel> {
    console.log(this.token, "aqui esta el token");

    return this.http.post<DepartamentoProponenteModel>(`${this.url}/proponente-departamento`, {
      id_proponente: data.id_proponente,
      id_departamento: data.id_departamento
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<DepartamentoProponenteModel> {
    return this.http.get<DepartamentoProponenteModel>(`${this.url}/proponente-departamento/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }


  EditRecord(data: DepartamentoProponenteModel): Observable<DepartamentoProponenteModel> {
    return this.http.put<DepartamentoProponenteModel>(
      `${this.url}/proponente-departamento/${data.id}`,
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
      `${this.url}/proponente-departamento/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
