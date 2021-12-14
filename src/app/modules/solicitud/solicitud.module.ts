import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SolicitudRoutingModule } from './solicitud-routing.module';
import { CrearSolicitudComponent } from './crear-solicitud/crear-solicitud.component';
import { ListarSolicitudComponent } from './listar-solicitud/listar-solicitud.component';
import { ActualizarSolicitudComponent } from './actualizar-solicitud/actualizar-solicitud.component';
import { EliminarSolicitudComponent } from './eliminar-solicitud/eliminar-solicitud.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { ListarSolicitudEvaluadasComponent } from './listar-solicitud-evaluadas/listar-solicitud-evaluadas.component';
import { AsignarSolicitudComponent } from './asignar-solicitud/asignar-solicitud.component';
import { ListarSolicitudSinEvaluarComponent } from './listar-solicitud-sin-evaluar/listar-solicitud-sin-evaluar.component';

@NgModule({
  declarations: [
    CrearSolicitudComponent,
    ListarSolicitudComponent,
    ActualizarSolicitudComponent,
    EliminarSolicitudComponent,
    ListarSolicitudEvaluadasComponent,
    AsignarSolicitudComponent,
    ListarSolicitudSinEvaluarComponent
  ],
  imports: [
    CommonModule,
    SolicitudRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SolicitudModule { }
