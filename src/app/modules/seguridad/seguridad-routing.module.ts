import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContraComponent } from '../seguridad/cambiar-contra/cambiar-contra.component';
import { CerrarSesionComponent } from '../seguridad/cerrar-sesion/cerrar-sesion.component';
import { InicioSesionComponent } from '../seguridad/inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from '../seguridad/recuperar-contra/recuperar-contra.component';

const routes: Routes = [
  {
    path: "inicio-sesion",
    component: InicioSesionComponent
  },
  {
    path: "cerrar-sesion",
    component: CerrarSesionComponent
  },
  {
    path: "cambiar-contra",
    component: CambiarContraComponent
  },
  {
    path: "recuperar-contra",
    component: RecuperarContraComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
