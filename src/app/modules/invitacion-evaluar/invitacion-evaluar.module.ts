import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvitacionEvaluarRoutingModule } from './invitacion-evaluar-routing.module';
import { CrearInvitacionEvComponent } from './crear-invitacion-ev/crear-invitacion-ev.component';
import { ListarInvitacionEvComponent } from './listar-invitacion-ev/listar-invitacion-ev.component';
import { ListarInvitacionAceptadaComponent } from './listar-invitacion-aceptada/listar-invitacion-aceptada.component';
import { EliminarInvitacionEvComponent } from './eliminar-invitacion-ev/eliminar-invitacion-ev.component';
import { AceptadaInvitacionEvComponent } from './aceptada-invitacion-ev/aceptada-invitacion-ev.component';
import { RechazadaInvitacionEvComponent } from './rechazada-invitacion-ev/rechazada-invitacion-ev.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ResponderInvitacionEvComponent } from './responder-invitacion-ev/responder-invitacion-ev.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CrearInvitacionEvComponent,
    ListarInvitacionEvComponent,
    EliminarInvitacionEvComponent,
    AceptadaInvitacionEvComponent,
    RechazadaInvitacionEvComponent,
    ResponderInvitacionEvComponent,
    ListarInvitacionAceptadaComponent,
    ],
  imports: [
    CommonModule,
    InvitacionEvaluarRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class InvitacionEvaluarModule { }
