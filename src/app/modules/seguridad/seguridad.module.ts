import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { CambiarContraComponent } from './cambiar-contra/cambiar-contra.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { SharedModule } from '../../modules/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    InicioSesionComponent,
    RecuperarContraComponent,
    CambiarContraComponent,
    CerrarSesionComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SeguridadModule { }
