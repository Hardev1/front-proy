import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RecordatorioModel } from 'src/app/models/parametros/recordatorio.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RecordatorioService {

  token: string = "";
  url: string = GeneralData.BUSSINESS_URL;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<RecordatorioModel[]> {
    ///http://localhost:3000/recordatorio?filter={"include":[{"relation":"tiene_una"}]}
    return this.http.get<RecordatorioModel[]>(`${this.url}/recordatorio?filter={"include":[{"relation":"tiene_una"}]}`,
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      });
  }

  Aceptadas(): Observable<RecordatorioModel[]> {
    return this.http.get<RecordatorioModel[]>(`${this.url}/recordatorio?filter={"include":[{"relation":"tiene_una"}]}`,
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    );
  }

  SaveRecord(data: RecordatorioModel): Observable<RecordatorioModel> {
    console.log(data);

    return this.http.post<RecordatorioModel>(`${this.url}/crear-recordatorio`, {
      fecha: data.fecha,
      tipo_recordatorio: data.tipo_recordatorio,
      descripcion: data.descripcion,
      id_invitacion_evaluar: data.id_invitacion_evaluar
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<RecordatorioModel> {
    return this.http.get<RecordatorioModel>(`${this.url}/recordatorio/${id}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    });
  }

  EditRecord(data: RecordatorioModel): Observable<RecordatorioModel> {
    return this.http.put<RecordatorioModel>(
      `${this.url}/recordatorio/${data.id}`,
      {
        id: data.id,
        fecha: data.fecha,
        tipo_recordatorio: data.tipo_recordatorio,
        descripcion: data.descripcion,
        id_invitacion_evaluar: data.id_invitacion_evaluar
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/recordatorio/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  CallReminder(data: RecordatorioModel): Observable<RecordatorioModel> {
    console.log(data);
    return this.http.post<RecordatorioModel>(`${this.url}/recordatorio-llamada/`, {
      descripcion: data.descripcion,
      id_invitacion_evaluar: data.id_invitacion_evaluar
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }


  TextReminder(data: RecordatorioModel): Observable<RecordatorioModel> {
    console.log(data);
    return this.http.post<RecordatorioModel>(`${this.url}/recordatorio-correo/`, {
      id_invitacion_evaluar: data.id_invitacion_evaluar
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }
}