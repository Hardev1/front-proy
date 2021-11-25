import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
    component: ListarUsuarioComponent
  },
  {
    path: "crear-usuario",
    component: CrearUsuarioComponent
  },
  {
    path: "actualizar-usuario/:id",
    component: EditarUsuarioComponent
  },
  {
    path: "eliminar-usuario/:id",
    component: EliminarUsuarioComponent
  },
  {
    path: "listar-rol",
    component: ListarRolComponent
  },
  {
    path: "crear-rol",
    component: CrearRolComponent
  },
  {
    path: "actualizar-rol/:_id",
    component: ActualizarRolComponent
  },
  {
    path: "eliminar-rol/:_id",
    component: EliminarRolComponent
  },
  {
    path: "inicio-sesion",
    component: InicioSesionComponent
  },
  {
    path: "cerrar-sesion",
    component: CerrarSesionComponent
  },
  {
    path: "cambiar-contraseña",
    component: CambiarContraComponent
  },
  {
    path: "recuperar-contraseña",
    component: RecuperarContraComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
