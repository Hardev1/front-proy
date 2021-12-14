import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { AceptadaInvitacionEvComponent } from './aceptada-invitacion-ev/aceptada-invitacion-ev.component';
import { CrearInvitacionEvComponent } from './crear-invitacion-ev/crear-invitacion-ev.component';
import { EliminarInvitacionEvComponent } from './eliminar-invitacion-ev/eliminar-invitacion-ev.component';
import { ListarInvitacionEvComponent } from './listar-invitacion-ev/listar-invitacion-ev.component';
import { RechazadaInvitacionEvComponent } from './rechazada-invitacion-ev/rechazada-invitacion-ev.component';
import { ResponderInvitacionEvComponent } from './responder-invitacion-ev/responder-invitacion-ev.component';
import { ListarInvitacionAceptadaComponent } from './listar-invitacion-aceptada/listar-invitacion-aceptada.component';

const routes: Routes = [
  {
    path: "crear-invitacion-evaluar",
    component: CrearInvitacionEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-invitacion-evaluar/:id",
    component: EliminarInvitacionEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-invitacion-evaluar",
    component: ListarInvitacionEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-invitacion-evaluar-aceptada",
    component: ListarInvitacionAceptadaComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "aceptada-invitacion-evaluar",
    component: AceptadaInvitacionEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "rechazada-invitacion-evaluar",
    component: RechazadaInvitacionEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "responder-invitacion/:id/:hash",
    component: ResponderInvitacionEvComponent,
    canActivate: [AuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class InvitacionEvaluarRoutingModule { }
