import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CargarArchivoComponent } from './archivos/cargar-archivo/cargar-archivo.component';
import { DescargarArchivoComponent } from './archivos/descargar-archivo/descargar-archivo.component';
import { ActualizarComiteComponent } from './comite/actualizar-comite/actualizar-comite.component';
import { CrearComiteComponent } from './comite/crear-comite/crear-comite.component';
import { EliminarComiteComponent } from './comite/eliminar-comite/eliminar-comite.component';
import { ListarComiteComponent } from './comite/listar-comite/listar-comite.component';
import { ActualizarDepartamentoComponent } from './departamento/actualizar-departamento/actualizar-departamento.component';
import { CrearDepartamentoComponent } from './departamento/crear-departamento/crear-departamento.component';
import { EliminarDepartamentoComponent } from './departamento/eliminar-departamento/eliminar-departamento.component';
import { ListarDepartamentoComponent } from './departamento/listar-departamento/listar-departamento.component';
import { ActualizarEstadoSolComponent } from './estadoSolicitud/actualizar-estado-sol/actualizar-estado-sol.component';
import { CrearEstadoSolComponent } from './estadoSolicitud/crear-estado-sol/crear-estado-sol.component';
import { EliminarEstadoSolComponent } from './estadoSolicitud/eliminar-estado-sol/eliminar-estado-sol.component';
import { ListarEstadoSolComponent } from './estadoSolicitud/listar-estado-sol/listar-estado-sol.component';
import { ActualizarFacultadComponent } from './facultad/actualizar-facultad/actualizar-facultad.component';
import { CrearFacultadComponent } from './facultad/crear-facultad/crear-facultad.component';
import { EliminarFacultadComponent } from './facultad/eliminar-facultad/eliminar-facultad.component';
import { ListarFacultadComponent } from './facultad/listar-facultad/listar-facultad.component';
import { ActualizarJuradoComponent } from './jurado/actualizar-jurado/actualizar-jurado.component';
import { CrearJuradoComponent } from './jurado/crear-jurado/crear-jurado.component';
import { EliminarJuradoComponent } from './jurado/eliminar-jurado/eliminar-jurado.component';
import { ListarJuradoComponent } from './jurado/listar-jurado/listar-jurado.component';
import { ActualizarLineaInvComponent } from './lineaInvestigacion/actualizar-linea-inv/actualizar-linea-inv.component';
import { CrearLineaInvComponent } from './lineaInvestigacion/crear-linea-inv/crear-linea-inv.component';
import { EliminarLineaInvComponent } from './lineaInvestigacion/eliminar-linea-inv/eliminar-linea-inv.component';
import { ListarLineaInvComponent } from './lineaInvestigacion/listar-linea-inv/listar-linea-inv.component';
import { ActualizarModalidadComponent } from './modalidad/actualizar-modalidad/actualizar-modalidad.component';
import { CrearModalidadComponent } from './modalidad/crear-modalidad/crear-modalidad.component';
import { EliminarModalidadComponent } from './modalidad/eliminar-modalidad/eliminar-modalidad.component';
import { ListarModalidadComponent } from './modalidad/listar-modalidad/listar-modalidad.component';
import { ActualizarProponenteComponent } from './proponente/actualizar-proponente/actualizar-proponente.component';
import { CrearProponenteComponent } from './proponente/crear-proponente/crear-proponente.component';
import { EliminarProponenteComponent } from './proponente/eliminar-proponente/eliminar-proponente.component';
import { ListarProponenteComponent } from './proponente/listar-proponente/listar-proponente.component';
import { ActualizarRecordatorioEvComponent } from './recordatorioEvaluacion/actualizar-recordatorio-ev/actualizar-recordatorio-ev.component';
import { CorreoRecordatorioEvComponent } from './recordatorioEvaluacion/correo-recordatorio-ev/correo-recordatorio-ev.component';
import { CrearRecordatorioEvComponent } from './recordatorioEvaluacion/crear-recordatorio-ev/crear-recordatorio-ev.component';
import { EliminarRecordatorioEvComponent } from './recordatorioEvaluacion/eliminar-recordatorio-ev/eliminar-recordatorio-ev.component';
import { ListarRecordatorioEvComponent } from './recordatorioEvaluacion/listar-recordatorio-ev/listar-recordatorio-ev.component';
import { LlamadaRecordatorioEvComponent } from './recordatorioEvaluacion/llamada-recordatorio-ev/llamada-recordatorio-ev.component';
import { ActualizarResultadoEvComponent } from './ResultadoEvaluacion/actualizar-resultado-ev/actualizar-resultado-ev.component';
import { CrearResultadoEvComponent } from './ResultadoEvaluacion/crear-resultado-ev/crear-resultado-ev.component';
import { EliminarResultadoEvComponent } from './ResultadoEvaluacion/eliminar-resultado-ev/eliminar-resultado-ev.component';
import { ListarResultadoEvComponent } from './ResultadoEvaluacion/listar-resultado-ev/listar-resultado-ev.component';
import { ActualizarTipoSolComponent } from './tipoSolicitud/actualizar-tipo-sol/actualizar-tipo-sol.component';
import { CrearTipoSolComponent } from './tipoSolicitud/crear-tipo-sol/crear-tipo-sol.component';
import { EliminarTipoSolComponent } from './tipoSolicitud/eliminar-tipo-sol/eliminar-tipo-sol.component';
import { ListarTipoSolComponent } from './tipoSolicitud/listar-tipo-sol/listar-tipo-sol.component';
import { ActualizarTipoVincComponent } from './tipoVinculacion/actualizar-tipo-vinc/actualizar-tipo-vinc.component';
import { CrearTipoVincComponent } from './tipoVinculacion/crear-tipo-vinc/crear-tipo-vinc.component';
import { EliminarTipoVincComponent } from './tipoVinculacion/eliminar-tipo-vinc/eliminar-tipo-vinc.component';
import { ListarTipoVincComponent } from './tipoVinculacion/listar-tipo-vinc/listar-tipo-vinc.component';

const routes: Routes = [
  {
    path: "cargar-archivo",
    component: CargarArchivoComponent
  },
  {
    path: "descargar-archivo",
    component: DescargarArchivoComponent
  },
  {
    path: "listar-comite",
    component: ListarComiteComponent
  },
  {
    path: "crear-comite",
    component: CrearComiteComponent
  },
  {
    path: "actualizar-comite",
    component: ActualizarComiteComponent
  },
  {
    path: "eliminar-comite",
    component: EliminarComiteComponent
  },
  {
    path: "listar-departamento",
    component: ListarDepartamentoComponent
  },
  {
    path: "crear-departamento",
    component: CrearDepartamentoComponent
  },
  {
    path: "actualizar-departamento",
    component: ActualizarDepartamentoComponent
  },
  {
    path: "eliminar-departamento",
    component: EliminarDepartamentoComponent
  },
  {
    path: "listar-estado-solicitud",
    component: ListarEstadoSolComponent
  },
  {
    path: "crear-estado-solicitud",
    component: CrearEstadoSolComponent
  },
  {
    path: "actualizar-estado-solicitud",
    component: ActualizarEstadoSolComponent
  },
  {
    path: "eliminar-estado-solicitud",
    component: EliminarEstadoSolComponent
  },
  {
    path: "listar-facultad",
    component: ListarFacultadComponent
  },
  {
    path: "crear-facultad",
    component: CrearFacultadComponent
  },
  {
    path: "actualizar-facultad",
    component: ActualizarFacultadComponent
  },
  {
    path: "eliminar-facultad",
    component: EliminarFacultadComponent
  },
  {
    path: "listar-jurado",
    component: ListarJuradoComponent
  },
  {
    path: "crear-jurado",
    component: CrearJuradoComponent
  },
  {
    path: "actualizar-jurado",
    component: ActualizarJuradoComponent
  },
  {
    path: "eliminar-jurado",
    component: EliminarJuradoComponent
  },
  {
    path: "listar-linea-investigacion",
    component: ListarLineaInvComponent
  },
  {
    path: "crear-linea-investigacion",
    component: CrearLineaInvComponent
  },
  {
    path: "actualizar-linea-investigacion",
    component: ActualizarLineaInvComponent
  },
  {
    path: "eliminar-linea-investigacion",
    component: EliminarLineaInvComponent
  },
  {
    path: "listar-modalidad",
    component: ListarModalidadComponent
  },
  {
    path: "crear-modalidad",
    component: CrearModalidadComponent
  },
  {
    path: "actualizar-modalidad",
    component: ActualizarModalidadComponent
  },
  {
    path: "eliminar-modalidad",
    component: EliminarModalidadComponent
  },
  {
    path: "listar-proponente",
    component: ListarProponenteComponent
  },
  {
    path: "crear-proponente",
    component: CrearProponenteComponent
  },
  {
    path: "actualizar-proponente",
    component: ActualizarProponenteComponent
  },
  {
    path: "eliminar-proponente",
    component: EliminarProponenteComponent
  },
  {
    path: "listar-recordatorio-evaluacion",
    component: ListarRecordatorioEvComponent
  },
  {
    path: "crear-recordatorio-evaluacion",
    component: CrearRecordatorioEvComponent
  },
  {
    path: "actualizar-recordatorio-evaluacion",
    component: ActualizarRecordatorioEvComponent
  },
  {
    path: "eliminar-recordatorio-evaluacion",
    component: EliminarRecordatorioEvComponent
  },
  {
    path: "llamada-recordatorio-evaluacion",
    component: LlamadaRecordatorioEvComponent
  },
  {
    path: "correo-recordatorio-evaluacion",
    component: CorreoRecordatorioEvComponent
  },
  {
    path: "listar-resultado-evaluacion",
    component: ListarResultadoEvComponent
  },
  {
    path: "crear-resultado-evaluacion",
    component: CrearResultadoEvComponent
  },
  {
    path: "actualizar-resultado-evaluacion",
    component: ActualizarResultadoEvComponent
  },
  {
    path: "eliminar-resultado-evaluacion",
    component: EliminarResultadoEvComponent
  },
  {
    path: "listar-tipo-solicitud",
    component: ListarTipoSolComponent
  },
  {
    path: "crear-tipo-solicitud",
    component: CrearTipoSolComponent
  },
  {
    path: "actualizar-tipo-solicitud",
    component: ActualizarTipoSolComponent
  },
  {
    path: "eliminar-tipo-solicitud",
    component: EliminarTipoSolComponent
  },
  {
    path: "listar-tipo-vinculacion",
    component: ListarTipoVincComponent
  },
  {
    path: "crear-tipo-vinculacion",
    component: CrearTipoVincComponent
  },
  {
    path: "actualizar-tipo-vinculacion",
    component: ActualizarTipoVincComponent
  },
  {
    path: "eliminar-tipo-vinculacion",
    component: EliminarTipoVincComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }