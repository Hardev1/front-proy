import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UnauthenticatedGuard } from 'src/app/guards/aunauthenticated.guard';
import { AuthenticatedGuard } from 'src/app/guards/authenticated.guard';
import { CambiarContraComponent } from '../seguridad/cambiar-contra/cambiar-contra.component';
import { CerrarSesionComponent } from '../seguridad/cerrar-sesion/cerrar-sesion.component';
import { InicioSesionComponent } from '../seguridad/inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from '../seguridad/recuperar-contra/recuperar-contra.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { ActualizarRolComponent } from './rol/actualizar-rol/actualizar-rol.component';
import { CrearRolComponent } from './rol/crear-rol/crear-rol.component';
import { EliminarRolComponent } from './rol/eliminar-rol/eliminar-rol.component';
import { ListarRolComponent } from './rol/listar-rol/listar-rol.component';

const routes: Routes = [
  {
    path: "listar-usuario",
    component: ListarUsuarioComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-usuario",
    component: CrearUsuarioComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-usuario/:id",
    component: EditarUsuarioComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-usuario/:id",
    component: EliminarUsuarioComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "listar-rol",
    component: ListarRolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "crear-rol",
    component: CrearRolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "actualizar-rol/:_id",
    component: ActualizarRolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "eliminar-rol/:_id",
    component: EliminarRolComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "inicio-sesion",
    component: InicioSesionComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: "cerrar-sesion",
    component: CerrarSesionComponent,
    canActivate: [AuthenticatedGuard]
  },
  {
    path: "cambiar-contraseña",
    component: CambiarContraComponent,
    canActivate: [UnauthenticatedGuard]
  },
  {
    path: "recuperar-contraseña",
    component: RecuperarContraComponent,
    canActivate: [UnauthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
