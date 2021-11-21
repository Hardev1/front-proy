import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { ModalidadModel } from 'src/app/models/parametros/modalidad.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ModalidadService {

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

  GetRecordList(): Observable<ModalidadModel[]> {
    return this.http.get<ModalidadModel[]>(`${this.url}/modalidads`)
  }

  SaveRecord(data: ModalidadModel): Observable<ModalidadModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<ModalidadModel>(`${this.url}/modalidad`, {
      nombre: data.nombre,
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<ModalidadModel> {
    return this.http.get<ModalidadModel>(`${this.url}/modalidad/${id}`);
  }

  EditRecord(data: ModalidadModel): Observable<ModalidadModel> {
    return this.http.put<ModalidadModel>(
      `${this.url}/modalidad/${data.id}`,
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
      `${this.url}/modalidad/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}