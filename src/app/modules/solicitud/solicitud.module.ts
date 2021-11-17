import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SolicitudRoutingModule } from './solicitud-routing.module';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';
import { SharedModule } from '../../modules/shared/shared.module';

@NgModule({
  declarations: [
    CrearSolicitudComponent,
    ListarSolicitudComponent,
    ActualizarSolicitudComponent,
    EliminarSolicitudComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    SharedModule
  ]
})
export class SolicitudModule { }
