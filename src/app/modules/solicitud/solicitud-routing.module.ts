import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';
import { ListarSolicitudEvaluadasComponent } from './listar-solicitud-evaluadas/listar-solicitud-evaluadas.component';
import { ListarSolicitudSinEvaluarComponent } from './listar-solicitud-sin-evaluar/listar-solicitud-sin-evaluar.component';
import { AsignarSolicitudComponent } from './asignar-solicitud/asignar-solicitud.component';

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
  {
    path: "listar-solicitud-evaluadas",
    component: ListarSolicitudEvaluadasComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-solicitud-sin-evaluar",
    component: ListarSolicitudSinEvaluarComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "asignar-solicitud/:id",
    component: AsignarSolicitudComponent,
    canActivate: [AuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
