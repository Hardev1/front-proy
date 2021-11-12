import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SessionData } from 'src/app/models/session-data.model';
import { UserCredentialsModel } from 'src/app/models/user-credentials.models';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    public http: HttpClient
  ) { }

  url: string = GeneralData.ADMIN_USERS_URL;

  Login(modelo: UserCredentialsModel): Observable<SessionData> {
    return this.http.post<SessionData>(`${this.url}/identificar-usuario`, {
      usuario: modelo.username,
      clave: modelo.password,
      rol: modelo.rol
    });
  }

}
