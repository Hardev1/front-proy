import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UploadedFileModel } from 'src/app/models/parametros/file.model';
import { ProponenteModel } from 'src/app/models/parametros/proponente.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProponenteService {

  token: string = "";
  url: string = GeneralData.BUSSINESS_URL;

  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<ProponenteModel[]> {
    //cambiar relation a tiene_un creo que se llamaba
    return this.http.get<ProponenteModel[]>(`${this.url}/proponentes?filter={"include":[{"relation":"tiene_un"}]}`);
  }


  //CAMBIAR NOMBRES DE LAS VARIABLES A LOS METODOS TAL Y COMO ES EN EL MODELO DE PROPONENTE
  SaveRecord(data: ProponenteModel): Observable<ProponenteModel> {
    return this.http.post<ProponenteModel>(`${this.url}/proponentes`, {
      primer_nombre: data.primer_nombre,
      otros_nombres: data.otros_nombres,
      primer_apellido: data.primer_apellido,
      segundo_apellido: data.segundo_apellido,
      documento: data.documento,
      fecha_nacimiento: data.fecha_nacimiento,
      email: data.email,
      celular: data.celular,
      fotografia: data.fotografia,
      id_tipo_vinculacion: data.id_tipo_vinculacion,
    },
      {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    )
  }

  SearchRecord(id: number): Observable<ProponenteModel> {
    return this.http.get<ProponenteModel>(`${this.url}/proponentes/${id}`);
  }

    //CAMBIAR NOMBRES DE LAS VARIABLES A LOS METODOS TAL Y COMO ES EN EL MODELO DE PROPONENTE
  EditRecord(data: ProponenteModel): Observable<ProponenteModel> {
    console.log(data.fotografia);
    
    return this.http.put<ProponenteModel>(
      `${this.url}/proponentes/${data.id}`,
      {
        id: data.id,
        primer_nombre: data.primer_nombre,
        otros_nombres: data.otros_nombres,
        primer_apellido: data.primer_apellido,
        segundo_apellido: data.segundo_apellido,
        documento: data.documento,
        fecha_nacimiento: data.fecha_nacimiento,
        email: data.email,
        celular: data.celular,
        fotografia: data.fotografia,
        id_tipo_vinculacion: data.id_tipo_vinculacion,
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

  UploadImage(formData: FormData): Observable<UploadedFileModel>{
    return this.http.post<UploadedFileModel>(
      `${this.url}/CargarImagenProponente`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  UploadFile(formData: FormData): Observable<UploadedFileModel>{
    return this.http.post<UploadedFileModel>(
      `${this.url}/CargarImagenProponente`,
      formData,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
