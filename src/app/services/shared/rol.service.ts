import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { RolModel } from 'src/app/modules/shared/modelos/rol.model';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }
  token: string = "";
  url: string = GeneralData.ADMIN_USERS_URL;
  
  GetRecordList():Observable<RolModel[]>{
   return this.http.get<RolModel[]>(`${this.url}/rols`)
  }

  SaveRecord(data: RolModel): Observable<RolModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<RolModel>(`${this.url}/rols`, {
      nombre: data.nombre,
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(_id: string): Observable<RolModel> {
    return this.http.get<RolModel>(`${this.url}/rols/${_id}`);
  }

  EditRecord(data: RolModel): Observable<RolModel> {
    return this.http.put<RolModel>(
      `${this.url}/rols/${data._id}`,
      {
        _id: data._id,
        nombre: data.nombre,
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(_id: string):Observable<any>{
    return this.http.delete(
      `${this.url}/rols/${_id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

}
