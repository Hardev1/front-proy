import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';

const routes: Routes = [
  {
    path: "actualizar-solicitud/:id",
    component: ActualizarSolicitudComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-solicitud",
    component: CrearSolicitudComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-solicitud/:id",
    component: EliminarSolicitudComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-solicitud",
    component: ListarSolicitudComponent,
    canActivate: [AuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
