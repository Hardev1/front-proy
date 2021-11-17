import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { DepartamentoModel } from 'src/app/models/departamento.model';
import { FacultadModel } from 'src/app/models/facultad.model';
import { LocalStorageService } from './local-storage.service';

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
    },
     {headers:
      new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      })
    } 
     )
  }

}
