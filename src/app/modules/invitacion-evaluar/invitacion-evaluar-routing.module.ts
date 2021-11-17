import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AceptadaInvitacionEvComponent } from './aceptada-invitacion-ev/aceptada-invitacion-ev.component';
import { ActualizarInvitacionEvComponent } from './actualizar-invitacion-ev/actualizar-invitacion-ev.component';
import { CrearInvitacionEvComponent } from './crear-invitacion-ev/crear-invitacion-ev.component';
import { EliminarInvitacionEvComponent } from './eliminar-invitacion-ev/eliminar-invitacion-ev.component';
import { ListarInvitacionEvComponent } from './listar-invitacion-ev/listar-invitacion-ev.component';
import { RechazadaInvitacionEvComponent } from './rechazada-invitacion-ev/rechazada-invitacion-ev.component';

const routes: Routes = [
  {
    path: "actualizar-invitacion-evaluar",
    component: ActualizarInvitacionEvComponent
  },
  {
    path: "crear-invitacion-evaluar",
    component: CrearInvitacionEvComponent
  },
  {
    path: "eliminar-invitacion-evaluar",
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InvitacionEvaluarRoutingModule { }
