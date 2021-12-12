import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { GeneralData } from 'src/app/config/general-data';
import { SessionData } from 'src/app/models/sesion/session-data.model';
import { UserCredentialsModel } from 'src/app/models/sesion/user-credentials.models';
import { CambioClaveModel } from 'src/app/models/cambio-clave.model';
import { LocalStorageService } from './local-storage.service';
import { AES } from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(
    public http: HttpClient,
    private localStorageService: LocalStorageService
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
  };

  IsThereActiveSession() {
    let data = localStorage.getItem("session-data");
    if (data) {
      let objectData: SessionData = JSON.parse(data);
      objectData.isLoggedIn = true;
      this.RefreshSessionData(objectData);
    };
  }

  RefreshSessionData(data: SessionData){
    this.sessionDataSubject.next(data);
  }

  GetSessionStatus(){
    return this.sessionDataSubject.asObservable();
  }

  RecoverPassword(usuario: string): Observable<SessionData> {
    return this.http.post<SessionData>(`${this.url}/recuperar-clave`, {
      email: usuario
    });
  }

  ChangePassword(modelo: CambioClaveModel): Observable<SessionData> {
    return this.http.post<SessionData>(`${this.url}/cambiar-clave`, {
      id_user: modelo.id_user,
      clave_actual: modelo.clave_actual,
      nueva_clave: modelo.nueva_clave
    });
  };

  VerificarToken(): Observable<boolean> {
    let tk = this.localStorageService.GetToken();
    if(tk == ""){
      return of(false);
    }
    return this.http.post<boolean>(`${this.url}/token-validator`, {
      token: tk
    });
  }

  CifrarTexto(texto: string) {
    let data = AES.encrypt(texto, GeneralData.key_encript_decrypt);
    return data;
  }

}
