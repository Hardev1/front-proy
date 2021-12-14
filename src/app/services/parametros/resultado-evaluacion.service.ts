import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { ResultadoEvaluacionModel } from 'src/app/models/parametros/resultado-evaluacion.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResultadoEvaluacionService {

  token: string = "";
  url: string = GeneralData.BUSSINESS_URL;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<ResultadoEvaluacionModel[]> {
    return this.http.get<ResultadoEvaluacionModel[]>(`${this.url}/resultado-evaluacion?filter={"include":[{"relation":"tiene_una"}]}`,
    {
      headers:
        new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
    }
    );
  }

  SaveRecord(data: ResultadoEvaluacionModel): Observable<ResultadoEvaluacionModel> {
    return this.http.post<ResultadoEvaluacionModel>(`${this.url}/resultado-evaluacion`, {
      fecha: data.fecha,
      formato_diligenciado: data.formato_diligenciado,
      descripcion: data.descripcion,
      id_invitacion_evaluar: data.id_invitacion_evaluar,
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<ResultadoEvaluacionModel> {
    return this.http.get<ResultadoEvaluacionModel>(`${this.url}/resultado-evaluacion/${id}`,
    {
      headers:
        new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
    }
    );
  }

  EditRecord(data: ResultadoEvaluacionModel): Observable<ResultadoEvaluacionModel> {

    return this.http.put<ResultadoEvaluacionModel>(
      `${this.url}/resultado-evaluacion/${data.id}`,
      {
        id: data.id,
        formato_diligenciado: data.formato_diligenciado,
        descripcion: data.descripcion,
        id_invitacion_evaluar: data.id_invitacion_evaluar,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/resultado-evaluacion/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

}
