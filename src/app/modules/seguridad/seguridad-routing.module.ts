import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CambiarContraComponent } from '../seguridad/cambiar-contra/cambiar-contra.component';
import { CerrarSesionComponent } from '../seguridad/cerrar-sesion/cerrar-sesion.component';
import { InicioSesionComponent } from '../seguridad/inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from '../seguridad/recuperar-contra/recuperar-contra.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';

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
    path: "inicio-sesion",
    component: InicioSesionComponent
  },
  {
    path: "cerrar-sesion",
    component: CerrarSesionComponent
  },
  {
    path: "cambiar-contra",
    component: CambiarContraComponent
  },
  {
    path: "recuperar-contra",
    component: RecuperarContraComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
