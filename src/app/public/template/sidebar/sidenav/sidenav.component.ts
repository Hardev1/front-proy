import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { SessionData } from 'src/app/models/sesion/session-data.model';
import { SecurityService } from 'src/app/services/shared/security.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnDestroy, OnInit {
  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private router: Router, private securityService: SecurityService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  subscription: Subscription = new Subscription();
  sesion: boolean = false;
  nombre: any = "";
  rol: any = "";

  panelOpenState = false;
  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 2 }, (_, i) => `Crear jurado ${i + 1}`);

  private _mobileQueryListener: () => void;

  prueba() {
    this.router.navigate(['/parametros/listar-departamento'])
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.subscription = this.securityService.GetSessionStatus().subscribe(
      {
        next: (data: SessionData) => {
          this.sesion = data.isLoggedIn;
          this.nombre = data.usuario?.nombre;
          this.rol = data.rol?.nombre;
        },
        error: (err) => {

        }
      }
    );
  }

  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
}
