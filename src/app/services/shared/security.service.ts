import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SessionData } from 'src/app/models/sesion/session-data.model';
import { UserCredentialsModel } from 'src/app/models/sesion/user-credentials.models';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    public http: HttpClient
  ) {
    this.IsThereActiveSession();
   }

  sessionDataSubject: BehaviorSubject<SessionData> = new BehaviorSubject<SessionData>(new SessionData());

  url: string = GeneralData.ADMIN_USERS_URL;

  Login(modelo: UserCredentialsModel): Observable<SessionData> {
    return this.http.post<SessionData>(`${this.url}/identificar-usuario`, {
      usuario: modelo.username,
      clave: modelo.password,
      rol: modelo.rol
    });
  }

  IsThereActiveSession() {
    let data = localStorage.getItem("session-data");
    if (data) {
      let objectData: SessionData = JSON.parse(data);
      objectData.isLoggedIn = true;
      this.RefreshSessionData(objectData);
    }
  }

  RefreshSessionData(data: SessionData){
    this.sessionDataSubject.next(data);
  }

  GetSessionStatus(){
    return this.sessionDataSubject.asObservable();
  }

}
