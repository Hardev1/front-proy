import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
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
import { CrearJuradoLineaInvestigacionComponent } from './jurado-lineaInvestigacion/crear-jurado-lineaInvestigacion/crear-jurado-lineaInvestigacion.component';
import { ListarJuradoLineaInvestigacionComponent } from './jurado-lineaInvestigacion/listar-jurado-lineaInvestigacion/listar-jurado-lineaInvestigacion.component';
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
import { ActualizarProponenteDepartamentoComponent } from './proponente-departamento/actualizar-proponente-departamento/actualizar-proponente-departamento.component';
import { CrearProponenteDepartamentoComponent } from './proponente-departamento/crear-proponente-departamento/crear-proponente-departamento.component';
import { EliminarProponenteDepartamentoComponent } from './proponente-departamento/eliminar-proponente-departamentos/eliminar-proponente-departamento.component';
import { ListarProponenteDepartamentoComponent } from './proponente-departamento/listar-proponente-departamento/listar-proponente-departamento.component';
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
import { CrearSolicitudComiteComponent } from './solicitud-comite/crear-solicitud-comite/crear-solicitud-comite.component';
import { ListarSolicitudComiteComponent } from './solicitud-comite/listar-solicitud-comite/listar-solicitud-comite.component';
import { CrearSolicitudProponenteComponent } from './solicitud-proponente/crear-solicitud-proponente/crear-solicitud-proponente.component';
import { ListarSolicitudProponenteComponent } from './solicitud-proponente/listar-solicitud-proponente/listar-solicitud-proponente.component';
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
    path: "listar-comite",
    component: ListarComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-comite",
    component: CrearComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-comite/:id",
    component: ActualizarComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-comite/:id",
    component: EliminarComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-departamento",
    component: ListarDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-departamento",
    component: CrearDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-departamento/:id",
    component: ActualizarDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-departamento/:id",
    component: EliminarDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-estado-solicitud",
    component: ListarEstadoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-estado-solicitud",
    component: CrearEstadoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-estado-solicitud/:id",
    component: ActualizarEstadoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-estado-solicitud/:id",
    component: EliminarEstadoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-facultad",
    component: ListarFacultadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-facultad",
    component: CrearFacultadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-facultad/:id",
    component: ActualizarFacultadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-facultad/:id",
    component: EliminarFacultadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-jurado",
    component: ListarJuradoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-solicitud-comite",
    component: CrearSolicitudComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-jurado",
    component: CrearJuradoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-jurado-lineaInvestigacion",
    component: CrearJuradoLineaInvestigacionComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-jurado-lineaInvestigacion",
    component: ListarJuradoLineaInvestigacionComponent,
    canActivate: [AuthenticatedGuard]
  },
  /* {
    path: "actualizar-jurado-lineaInvestigacion/:id",
    component: ActualizarJuradoLineaInvestigacionComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-jurado-lineaInvestigacion/:id",
    component: EliminarJuradoLineaInvestigacionComponent,
    canActivate: [AuthenticatedGuard]
  {
    path: "eliminar-solicitud-comite/:id",
    component: EliminarSolicitudComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
  }, */
  {
    path: "actualizar-jurado/:id",
    component: ActualizarJuradoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-jurado/:id",
    component: EliminarJuradoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-linea-investigacion",
    component: ListarLineaInvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-linea-investigacion",
    component: CrearLineaInvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-linea-investigacion/:id",
    component: ActualizarLineaInvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-linea-investigacion/:id",
    component: EliminarLineaInvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-modalidad",
    component: ListarModalidadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-modalidad",
    component: CrearModalidadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-modalidad/:id",
    component: ActualizarModalidadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-modalidad/:id",
    component: EliminarModalidadComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-proponente",
    component: ListarProponenteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-proponente",
    component: CrearProponenteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-proponente/:id",
    component: ActualizarProponenteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-proponente/:id",
    component: EliminarProponenteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-recordatorio-evaluacion",
    component: ListarRecordatorioEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-recordatorio-evaluacion/:id",
    component: CrearRecordatorioEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-recordatorio-evaluacion/:id",
    component: ActualizarRecordatorioEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-recordatorio-evaluacion/:id",
    component: EliminarRecordatorioEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "llamada-recordatorio-evaluacion/:id",
    component: LlamadaRecordatorioEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "correo-recordatorio-evaluacion/:id",
    component: CorreoRecordatorioEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-resultado-evaluacion",
    component: ListarResultadoEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-resultado-evaluacion",
    component: CrearResultadoEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-resultado-evaluacion/:id",
    component: ActualizarResultadoEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-resultado-evaluacion/:id",
    component: EliminarResultadoEvComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-tipo-solicitud",
    component: ListarTipoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-tipo-solicitud",
    component: CrearTipoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-tipo-solicitud/:id",
    component: ActualizarTipoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-tipo-solicitud/:id",
    component: EliminarTipoSolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-tipo-vinculacion",
    component: ListarTipoVincComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-tipo-vinculacion",
    component: CrearTipoVincComponent
  },
  {
    path: "actualizar-tipo-vinculacion/:id",
    component: ActualizarTipoVincComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-tipo-vinculacion/:id",
    component: EliminarTipoVincComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-solicitud-proponente/:id",
    component: CrearSolicitudProponenteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-solicitud-proponente",
    component: ListarSolicitudProponenteComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-proponente-departamento",
    component: ListarProponenteDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-proponente-departamento",
    component: CrearProponenteDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-proponente-departamento/:id",
    component: ActualizarProponenteDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-proponente-departamento/:id",
    component: EliminarProponenteDepartamentoComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-solicitud-comite",
    component: ListarSolicitudComiteComponent,
    canActivate: [AuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParametrosRoutingModule { }