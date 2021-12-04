import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptadaInvitacionEvComponent } from './aceptada-invitacion-ev/aceptada-invitacion-ev.component';
import { ActualizarInvitacionEvComponent } from './actualizar-invitacion-ev/actualizar-invitacion-ev.component';
import { CrearInvitacionEvComponent } from './crear-invitacion-ev/crear-invitacion-ev.component';
import { EliminarInvitacionEvComponent } from './eliminar-invitacion-ev/eliminar-invitacion-ev.component';
import { ListarInvitacionEvComponent } from './listar-invitacion-ev/listar-invitacion-ev.component';
import { RechazadaInvitacionEvComponent } from './rechazada-invitacion-ev/rechazada-invitacion-ev.component';
import { ResponderInvitacionEvComponent } from './responder-invitacion-ev/responder-invitacion-ev.component';

const routes: Routes = [
  {
    path: "actualizar-invitacion-evaluar/:id",
    component: ActualizarInvitacionEvComponent
  },
  {
    path: "crear-invitacion-evaluar",
    component: CrearInvitacionEvComponent
  },
  {
    path: "eliminar-invitacion-evaluar/:id",
    component: EliminarInvitacionEvComponent
  },
  {
    path: "listar-invitacion-evaluar",
    component: ListarInvitacionEvComponent
  },
  {
    path: "aceptada-invitacion-evaluar",
    component: AceptadaInvitacionEvComponent
  },
  {
    path: "rechazada-invitacion-evaluar",
    component: RechazadaInvitacionEvComponent
  },
  {
    path: "responder-invitacion/:id/:hash",
    component: ResponderInvitacionEvComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InvitacionEvaluarRoutingModule { }
