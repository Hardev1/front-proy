import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LocalStorageService } from '../services/shared/local-storage.service';

@Injectable()
export class AuthTokenInterceptor implements HttpInterceptor {
  token: string = "";
  constructor(
    private localStorageService: LocalStorageService,
    private router: Router
  ) { 
    this.token = this.localStorageService.GetToken();
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.slice(0, 20) != 'http://localhost:4200/parametros/cargar-archivo') {

      const reqTemp = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`
        })
      });
      console.log("Bearer token agregado")
      return next.handle(reqTemp).pipe(
        tap(
          (event: HttpEvent<any>) =>{
            if(event instanceof HttpResponse){
  
            }
          },
          (error: HttpErrorResponse) => {
            if(error.status == 401){
              this.localStorageService.RemoveSessionData();
              this.router.navigate(["/security/login"])
            }
          }
        )
      );
    }
    return next.handle(req)
  }
}