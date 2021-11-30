import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ParametrosRoutingModule } from './parametros-routing.module';
import { CrearFacultadComponent } from './facultad/crear-facultad/crear-facultad.component';
import { ListarFacultadComponent } from './facultad/listar-facultad/listar-facultad.component';
import { ActualizarFacultadComponent } from './facultad/actualizar-facultad/actualizar-facultad.component';
import { EliminarFacultadComponent } from './facultad/eliminar-facultad/eliminar-facultad.component';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';
import { ActualizarDepartamentoComponent } from './departamento/actualizar-departamento/actualizar-departamento.component';
import { EliminarDepartamentoComponent } from './departamento/eliminar-departamento/eliminar-departamento.component';
import { CrearProponenteComponent } from './proponente/crear-proponente/crear-proponente.component';
import { ListarProponenteComponent } from './proponente/listar-proponente/listar-proponente.component';
import { ActualizarProponenteComponent } from './proponente/actualizar-proponente/actualizar-proponente.component';
import { EliminarProponenteComponent } from './proponente/eliminar-proponente/eliminar-proponente.component';
import { CrearTipoVincComponent } from './tipoVinculacion/crear-tipo-vinc/crear-tipo-vinc.component';
import { ListarTipoVincComponent } from './tipoVinculacion/listar-tipo-vinc/listar-tipo-vinc.component';
import { ActualizarTipoVincComponent } from './tipoVinculacion/actualizar-tipo-vinc/actualizar-tipo-vinc.component';
import { EliminarTipoVincComponent } from './tipoVinculacion/eliminar-tipo-vinc/eliminar-tipo-vinc.component';
import { CrearRecordatorioEvComponent } from './recordatorioEvaluacion/crear-recordatorio-ev/crear-recordatorio-ev.component';
import { ListarRecordatorioEvComponent } from './recordatorioEvaluacion/listar-recordatorio-ev/listar-recordatorio-ev.component';
import { ActualizarRecordatorioEvComponent } from './recordatorioEvaluacion/actualizar-recordatorio-ev/actualizar-recordatorio-ev.component';
import { EliminarRecordatorioEvComponent } from './recordatorioEvaluacion/eliminar-recordatorio-ev/eliminar-recordatorio-ev.component';
import { CorreoRecordatorioEvComponent } from './recordatorioEvaluacion/correo-recordatorio-ev/correo-recordatorio-ev.component';
import { LlamadaRecordatorioEvComponent } from './recordatorioEvaluacion/llamada-recordatorio-ev/llamada-recordatorio-ev.component';
import { CrearComiteComponent } from './comite/crear-comite/crear-comite.component';
import { ListarComiteComponent } from './comite/listar-comite/listar-comite.component';
import { ActualizarComiteComponent } from './comite/actualizar-comite/actualizar-comite.component';
import { EliminarComiteComponent } from './comite/eliminar-comite/eliminar-comite.component';
import { CrearResultadoEvComponent } from './ResultadoEvaluacion/crear-resultado-ev/crear-resultado-ev.component';
import { ListarResultadoEvComponent } from './ResultadoEvaluacion/listar-resultado-ev/listar-resultado-ev.component';
import { ActualizarResultadoEvComponent } from './ResultadoEvaluacion/actualizar-resultado-ev/actualizar-resultado-ev.component';
import { EliminarResultadoEvComponent } from './ResultadoEvaluacion/eliminar-resultado-ev/eliminar-resultado-ev.component';
import { CrearJuradoComponent } from './jurado/crear-jurado/crear-jurado.component';
import { ListarJuradoComponent } from './jurado/listar-jurado/listar-jurado.component';
import { ActualizarJuradoComponent } from './jurado/actualizar-jurado/actualizar-jurado.component';
import { EliminarJuradoComponent } from './jurado/eliminar-jurado/eliminar-jurado.component';
import { CrearLineaInvComponent } from './lineaInvestigacion/crear-linea-inv/crear-linea-inv.component';
import { ListarLineaInvComponent } from './lineaInvestigacion/listar-linea-inv/listar-linea-inv.component';
import { ActualizarLineaInvComponent } from './lineaInvestigacion/actualizar-linea-inv/actualizar-linea-inv.component';
import { EliminarLineaInvComponent } from './lineaInvestigacion/eliminar-linea-inv/eliminar-linea-inv.component';
import { CrearTipoSolComponent } from './tipoSolicitud/crear-tipo-sol/crear-tipo-sol.component';
import { ListarTipoSolComponent } from './tipoSolicitud/listar-tipo-sol/listar-tipo-sol.component';
import { ActualizarTipoSolComponent } from './tipoSolicitud/actualizar-tipo-sol/actualizar-tipo-sol.component';
import { EliminarTipoSolComponent } from './tipoSolicitud/eliminar-tipo-sol/eliminar-tipo-sol.component';
import { CrearModalidadComponent } from './modalidad/crear-modalidad/crear-modalidad.component';
import { ListarModalidadComponent } from './modalidad/listar-modalidad/listar-modalidad.component';
import { ActualizarModalidadComponent } from './modalidad/actualizar-modalidad/actualizar-modalidad.component';
import { EliminarModalidadComponent } from './modalidad/eliminar-modalidad/eliminar-modalidad.component';
import { CrearEstadoSolComponent } from './estadoSolicitud/crear-estado-sol/crear-estado-sol.component';
import { ListarEstadoSolComponent } from './estadoSolicitud/listar-estado-sol/listar-estado-sol.component';
import { ActualizarEstadoSolComponent } from './estadoSolicitud/actualizar-estado-sol/actualizar-estado-sol.component';
import { EliminarEstadoSolComponent } from './estadoSolicitud/eliminar-estado-sol/eliminar-estado-sol.component';
import { CargarArchivoComponent } from './archivos/cargar-archivo/cargar-archivo.component';
import { DescargarArchivoComponent } from './archivos/descargar-archivo/descargar-archivo.component';
import { SharedModule } from '../../modules/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CrearSolicitudProponenteComponent } from './solicitud-proponente/crear-solicitud-proponente/crear-solicitud-proponente.component';

@NgModule({
  declarations: [
  
       CrearFacultadComponent,
       ListarFacultadComponent,
       ActualizarFacultadComponent,
       EliminarFacultadComponent,
       CrearDepartamentoComponent,
       ListarDepartamentoComponent,
       ActualizarDepartamentoComponent,
       EliminarDepartamentoComponent,
       CrearProponenteComponent,
       ListarProponenteComponent,
       ActualizarProponenteComponent,
       EliminarProponenteComponent,
       CrearTipoVincComponent,
       ListarTipoVincComponent,
       ActualizarTipoVincComponent,
       EliminarTipoVincComponent,
       CrearRecordatorioEvComponent,
       ListarRecordatorioEvComponent,
       ActualizarRecordatorioEvComponent,
       EliminarRecordatorioEvComponent,
       CorreoRecordatorioEvComponent,
       LlamadaRecordatorioEvComponent,
       CrearComiteComponent,
       ListarComiteComponent,
       ActualizarComiteComponent,
       EliminarComiteComponent,
       CrearResultadoEvComponent,
       ListarResultadoEvComponent,
       ActualizarResultadoEvComponent,
       EliminarResultadoEvComponent,
       CrearJuradoComponent,
       ListarJuradoComponent,
       ActualizarJuradoComponent,
       EliminarJuradoComponent,
       CrearLineaInvComponent,
       ListarLineaInvComponent,
       ActualizarLineaInvComponent,
       EliminarLineaInvComponent,
       CrearTipoSolComponent,
       ListarTipoSolComponent,
       ActualizarTipoSolComponent,
       EliminarTipoSolComponent,
       CrearModalidadComponent,
       ListarModalidadComponent,
       ActualizarModalidadComponent,
       EliminarModalidadComponent,
       CrearEstadoSolComponent,
       ListarEstadoSolComponent,
       ActualizarEstadoSolComponent,
       EliminarEstadoSolComponent,
       CargarArchivoComponent,
       DescargarArchivoComponent,
       CrearSolicitudProponenteComponent
  ],
  imports: [
    CommonModule,
    ParametrosRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ParametrosModule { }
