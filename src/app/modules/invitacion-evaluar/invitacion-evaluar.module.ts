import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitacionEvaluarRoutingModule } from './invitacion-evaluar-routing.module';
import { CrearInvitacionEvComponent } from './crear-invitacion-ev/crear-invitacion-ev.component';
import { ListarInvitacionEvComponent } from './listar-invitacion-ev/listar-invitacion-ev.component';
import { ActualizarInvitacionEvComponent } from './actualizar-invitacion-ev/actualizar-invitacion-ev.component';
import { EliminarInvitacionEvComponent } from './eliminar-invitacion-ev/eliminar-invitacion-ev.component';
import { AceptadaInvitacionEvComponent } from './aceptada-invitacion-ev/aceptada-invitacion-ev.component';
import { RechazadaInvitacionEvComponent } from './rechazada-invitacion-ev/rechazada-invitacion-ev.component';
import { SharedModule } from '../../modules/shared/shared.module';


@NgModule({
  declarations: [
    CrearInvitacionEvComponent,
    ListarInvitacionEvComponent,
    ActualizarInvitacionEvComponent,
    EliminarInvitacionEvComponent,
    AceptadaInvitacionEvComponent,
    RechazadaInvitacionEvComponent
  ],
  imports: [
    CommonModule,
    InvitacionEvaluarRoutingModule,
    SharedModule
  ]
})
export class InvitacionEvaluarModule { }
