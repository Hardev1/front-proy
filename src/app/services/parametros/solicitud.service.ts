import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { SolicitudModel } from 'src/app/models/parametros/solicitud.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {

  token: string = "";
  url: string = GeneralData.BUSSINESS_URL;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<SolicitudModel[]> {
    return this.http.get<SolicitudModel[]>(`${this.url}/solicitud?filter={"include":[{"relation":"tiene_una"},{"relation":"posee_un"},{"relation":"pertenece_a"},{"relation":"tiene_un"}]}`,
    {
      headers:
        new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
    });
  }

  SaveRecord(data: SolicitudModel): Observable<SolicitudModel> {
    console.log(data);
    
    return this.http.post<SolicitudModel>(`${this.url}/crear-solicitud`, {
      fecha: data.fecha,
      nombre_solicitud: data.nombre_solicitud,
      descripcion: data.descripcion,
      id_modalidad: data.id_modalidad,
      id_linea_investigacion: data.id_linea_investigacion,
      id_estado_solicitud: data.id_estado_solicitud,
      id_tipo_solicitud: data.id_tipo_solicitud,
      archivo: data.archivo
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<SolicitudModel> {
    return this.http.get<SolicitudModel>(`${this.url}/solicituds/${id}`);
  }

  EditRecord(data: SolicitudModel): Observable<SolicitudModel> {
    return this.http.put<SolicitudModel>(
      `${this.url}/solicituds/${data.id}`,
      {
        id: data.id,
        fecha: data.fecha,
        nombre_solicitud: data.nombre_solicitud,
        archivo: data.archivo,
        descripcion: data.descripcion,
        id_tipo_solicitud: data.id_tipo_solicitud,
        id_estado_solicitud: data.id_estado_solicitud,
        id_modalidad: data.id_modalidad,
        id_linea_investigacion: data.id_linea_investigacion,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/solicituds/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  UploadFile(formData: FormData): Observable<UploadedFileModel>{
    return this.http.post<UploadedFileModel>(
      `${this.url}/CargarDocumentoDeSolicitud`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
