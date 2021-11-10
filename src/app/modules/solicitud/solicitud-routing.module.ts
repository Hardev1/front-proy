import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';

const routes: Routes = [
  {
    path: "actualizar-solicitud",
    component: ActualizarSolicitudComponent
  },
  {
    path: "crear-solicitud",
    component: CrearSolicitudComponent
  },
  {
    path: "eliminar-solicitud",
    component: EliminarSolicitudComponent
  },
  {
    path: "listar-solicitud",
    component: ListarSolicitudComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SolicitudRoutingModule { }
