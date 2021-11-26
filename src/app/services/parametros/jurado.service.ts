import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { JuradoModel } from 'src/app/models/parametros/jurado.model';
import { LocalStorageService } from '../shared/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class JuradoService {

  url: string = GeneralData.BUSSINESS_URL;
  token: string = "";
  constructor(
    private http: HttpClient,
    private localStorage: LocalStorageService
  ) { 
    this.token = this.localStorage.GetToken();
  }

  GetRecordList(): Observable<JuradoModel[]> {
    return this.http.get<JuradoModel[]>(`${this.url}/jurado`)
  }

  SaveRecord(data: JuradoModel): Observable<JuradoModel> {
    return this.http.post<JuradoModel>(`${this.url}/jurado`, {
      nombre: data.nombre,
      apellido: data.apellido,
      telefono: data.telefono,
      correo: data.correo,
      entidad: data.entidad,
      documento: data.documento,
      fechaNacimiento: data.fechaNacimiento
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

  SearchRecord(id: number): Observable<JuradoModel> {
    return this.http.get<JuradoModel>(`${this.url}/jurado/${id}`);
  }

  EditRecord(data: JuradoModel): Observable<JuradoModel> {
    return this.http.put<JuradoModel>(
      `${this.url}/jurado/${data.id}`,
      {
        id: data.id,
        nombre: data.nombre,
        apellido: data.apellido,
        entidad: data.entidad,
        correo: data.correo,
        fechaNacimiento: data.fechaNacimiento,
        documento: data.documento,
        telefono: data.telefono
      },
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }

  RemoveRecord(id: number):Observable<any>{
    return this.http.delete(
      `${this.url}/jurado/${id}`,
      {
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.token}`
        })
      });
  }
}
