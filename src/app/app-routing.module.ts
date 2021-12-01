import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './public/error/not-found/not-found.component';
import { InicioComponent } from './public/general/inicio/inicio.component';
import { InicioSesionComponent } from './modules/seguridad/inicio-sesion/inicio-sesion.component';

const routes: Routes = [
  {
    path: "inicio-sesion",
    component: InicioSesionComponent
  },
  {
    path: "inicio",
    component: InicioComponent
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "/inicio"
  },
  {
    path: "parametros",
    loadChildren: () => import("./modules/parametros/parametros.module").then(x => x.ParametrosModule)
  },
  {
    path: "invitacion-evaluar",
    loadChildren: () => import("./modules/invitacion-evaluar/invitacion-evaluar.module").then(x => x.InvitacionEvaluarModule)
  },
  {
    path: "seguridad",
    loadChildren: () => import("./modules/seguridad/seguridad.module").then(x => x.SeguridadModule)
  },
  {
    path: "solicitud",
    loadChildren: () => import("./modules/solicitud/solicitud.module").then(x => x.SolicitudModule)
  },
  {
    path: "reportes",
    loadChildren: () => import("./modules/reportes/reportes.module").then(x => x.ReportesModule)
  },
  {
    path: "shared",
    loadChildren: () => import("./modules/shared/modules/shared-modules.module").then(x => x.SharedModulesModule)
  },
  {
    path: "**",
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }