import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { TipoVinculacionModel } from 'src/app/models/parametros/tipo-vinculacion.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class TipoVinculacionService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<TipoVinculacionModel[]> {
    return this.http.get<TipoVinculacionModel[]>(`${this.url}/tipo-vinculacions`)
  }

  SaveRecord(data: TipoVinculacionModel): Observable<TipoVinculacionModel> {
    console.log(this.token, "aqui esta el token");
    
    return this.http.post<TipoVinculacionModel>(`${this.url}/tipo-vinculacions`, {
      nombre: data.nombre,
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<TipoVinculacionModel> {
    return this.http.get<TipoVinculacionModel>(`${this.url}/tipo-vinculacions/${id}`);
  }

  EditRecord(data: TipoVinculacionModel): Observable<TipoVinculacionModel> {
    return this.http.put<TipoVinculacionModel>(
      `${this.url}/tipo-vinculacions/${data.id}`,
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
      `${this.url}/tipo-vinculacions/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
