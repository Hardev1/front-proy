import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

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
  SaveRecord(data: DepartamentoModel): Observable<DepartamentoModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<DepartamentoModel>(`${this.url}/departamentos`, {
      nombre: data.nombre,
      id_facultad: data.id_facultad
    }/** ,
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } */
     )
  }

  GetRecordList(): Observable<DepartamentoModel[]> {
    return this.http.get<DepartamentoModel[]>(`${this.url}/departamentos?filter={"include":[{"relation":"pertenece_a"}]}`)
  }

  SearchRecord(id: number): Observable<DepartamentoModel> {
    return this.http.get<DepartamentoModel>(`${this.url}/departamentos/${id}`);
  }

  EditRecord(data: DepartamentoModel): Observable<DepartamentoModel> {
    return this.http.put<DepartamentoModel>(
      `${this.url}/departamentos/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
        id_facultad: data.id_facultad
      }
      /** ,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      } */);
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/departamentos/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      }
       );
  }
}
