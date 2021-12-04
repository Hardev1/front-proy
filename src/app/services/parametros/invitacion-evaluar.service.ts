import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { InvitacionEvaluarConceptualModel } from 'src/app/models/parametros/invitacion-evaluar-conceptual.model';
import { InvitacionEvaluarModel } from 'src/app/models/parametros/invitacion-evaluar.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class InvitacionEvaluarService {

  token: string = "";
  url: string = GeneralData.BUSSINESS_URL;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<InvitacionEvaluarModel[]> {
    return this.http.get<InvitacionEvaluarModel[]>(`${this.url}/invitacion-evaluar?filter={"include":[{"relation":"pertenece_a"}, {"relation":"tiene_una"}]}`);
  }

  SaveRecord(data: InvitacionEvaluarConceptualModel): Observable<InvitacionEvaluarConceptualModel> {
    console.log(data);

    return this.http.post<InvitacionEvaluarConceptualModel>(`${this.url}/crear-invitacion-evaluar`, {
      jurados: data.jurados,
      solicitudes: data.solicitudes,
      fecha_invitacion: data.fecha_invitacion,
      fecha_respuesta: data.fecha_respuesta,
      estado_invitacion: data.estado_invitacion,
      observaciones: data.observaciones,
      hash: data.hash
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<InvitacionEvaluarModel> {
    return this.http.get<InvitacionEvaluarModel>(`${this.url}/invitacion-evaluar/${id}`);
  }

  EditRecord(data: InvitacionEvaluarModel): Observable<InvitacionEvaluarModel> {
    return this.http.put<InvitacionEvaluarModel>(
      `${this.url}/invitacion-evaluar/${data.id}`,
      {
        id: data.id,
        jurados: data.jurados,
        solicitudes: data.solicitudes,
        fecha_invitacion: data.fecha_invitacion,
        fecha_respuesta: data.fecha_respuesta,
        estado_invitacion: data.estado_invitacion,
        observaciones: data.observaciones,
        hash: data.hash
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number): Observable<any> {
    return this.http.delete(
      `${this.url}/invitacion-evaluar/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  AcceptRecord(data: InvitacionEvaluarModel): Observable<InvitacionEvaluarModel> {
    console.log(data);

    return this.http.patch<InvitacionEvaluarModel>(`${this.url}/invitacion-evaluar-aceptada/${data.id}`, {
      id_jurado: data.id_jurado,
      id_solicitud: data.id_solicitud,
      fecha_invitacion: data.fecha_invitacion,
      fecha_respuesta: data.fecha_respuesta,
      estado_invitacion: data.estado_invitacion,
      observaciones: data.observaciones,
      hash: data.hash
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  RejectRecord(data: InvitacionEvaluarModel): Observable<InvitacionEvaluarModel> {
    console.log(data);

    return this.http.patch<InvitacionEvaluarModel>(`${this.url}/invitacion-evaluar-rechazada/${data.id}`, {
      id_jurado: data.id_jurado,
      id_solicitud: data.id_solicitud,
      fecha_invitacion: data.fecha_invitacion,
      fecha_respuesta: data.fecha_respuesta,
      estado_invitacion: data.estado_invitacion,
      observaciones: data.observaciones,
      hash: data.hash
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
