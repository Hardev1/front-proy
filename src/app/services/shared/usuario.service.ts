import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from '../../config/general-data';
import { UsuarioModel } from '../../models/usuario.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  //USO URL BUSSINESS PORQUE MI BACKEND USUARIOS CORREO SOBRE EL PUERTO 3000 COMO EL DE BUSSINESS AQUI
  url: string = GeneralData.ADMIN_USERS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) {
    this.token = this.localStorage.GetToken();
  }



  //CAMBIAR DESPUES DE THIS.URL POR LAS DEL BACKEND Y LOS NOMBRES DE VARIABLES A COMO SE RECIBAN EN LOS 
  //MODELOS DEL BACKEND

  GetRecordList(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.url}/users?filter={"include":[{"relation":"rols"}]}`)
  }

  SaveRecord(data: UsuarioModel): Observable<UsuarioModel> {
    console.log(this.token, "aqui esta el token");

    return this.http.post<UsuarioModel>(`${this.url}/users`, {
      nombre: data.nombre,
      apellido: data.apellido,
      documento: data.documento,
      email: data.email,
      fechaNacimiento: data.fechaNacimiento,
      telefono: data.telefono
    },
       {
        headers:
          new HttpHeaders({
            Authorization: `Bearer ${this.token}`
          })
      }
    
      )
    
  }

  SearchRecord(_id: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.url}/users/${_id}`);
  }

  EditRecord(data: UsuarioModel): Observable<UsuarioModel> {
    return this.http.put<UsuarioModel>(
      `${this.url}/users/${data._id}`,
      {
        _id: data._id,
        nombre: data.nombre,
        apellido: data.apellido,
        documento: data.documento,
        email: data.email,
        fechaNacimiento: data.fechaNacimiento,
        telefono: data.telefono,
        estado: data.estado
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: string): Observable<any> {
    return this.http.delete(
      `${this.url}/users/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
