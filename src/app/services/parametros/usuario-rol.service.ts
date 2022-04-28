import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { UsuarioRolModel } from 'src/app/models/parametros/usuario-rol.model';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioRolService {
  lista: string[] = []
  url: string = GeneralData.ADMIN_USERS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }


  GetRecordList(): Observable<UsuarioRolModel[]> {
    return this.http.get<UsuarioRolModel[]>(`${this.url}/rol-user`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }


  Buscar(data: string): Observable<UsuarioRolModel[]> {
    return this.http.get<UsuarioRolModel[]>(`${this.url}/rol-user?filter={"where":{"id_user":"${data}"}}`,
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }

  SaveRecord(data: UsuarioRolModel): Observable<UsuarioRolModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<UsuarioRolModel>(`${this.url}/rol-user`, {
      id_user: data.id_user,
      id_rol: data.id_rol
    }, 
    {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })
  }

  SearchRecord(data: UsuarioModel): Observable<UsuarioRolModel> {
    return this.http.get<UsuarioRolModel>(`${this.url}/users/${data._id}/rols`,
   {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    })  
  }

  EditRecord(data: UsuarioRolModel): Observable<UsuarioRolModel> {
    return this.http.put<UsuarioRolModel>(
      `${this.url}/comites/${data._id}`,
      {
        id: data._id,
        id_user: data.id_user,
        id_rol: data.id_rol,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(algo: any):Observable<any>{
    return this.http.delete(
      `${this.url}/rol-user/${algo._id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
