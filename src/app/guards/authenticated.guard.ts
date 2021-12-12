import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/shared/security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticatedGuard implements CanActivate {

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let tk = false;
    return new Promise(async (resolve, reject) => {
      this.securityService.VerificarToken().subscribe({
        next: async (data: boolean) => {
          tk = await data;
          console.log(tk);
          if (tk) {
            resolve(true);
            return true;
          }
          this.router.navigate(["/seguridad/inicio-sesion"]);
          resolve(false);
          return false;
        }
      });
    });
  }

}