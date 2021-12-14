import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionData } from 'src/app/models/sesion/session-data.model';
import { LocalStorageService } from 'src/app/services/shared/local-storage.service';
import { SecurityService } from 'src/app/services/shared/security.service';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrls: ['./cerrar-sesion.component.css']
})
export class CerrarSesionComponent implements OnInit {

  data = new SessionData()

  constructor(
    private localStorageService: LocalStorageService,
    private securityService: SecurityService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.localStorageService.RemoveSessionData();
    this.securityService.RefreshSessionData(this.data);
    this.router.navigate(["/inicio"]);
    console.log(this.data)
  }

}
