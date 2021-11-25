import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeguridadRoutingModule } from './seguridad-routing.module';
import { InicioSesionComponent } from './inicio-sesion/inicio-sesion.component';
import { RecuperarContraComponent } from './recuperar-contra/recuperar-contra.component';
import { CambiarContraComponent } from './cambiar-contra/cambiar-contra.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { SharedModule } from '../../modules/shared/shared.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarUsuarioComponent } from './listar-usuario/listar-usuario.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { EliminarUsuarioComponent } from './eliminar-usuario/eliminar-usuario.component';
import { RecaptchaModule } from 'ng-recaptcha';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [
    InicioSesionComponent,
    RecuperarContraComponent,
    CambiarContraComponent,
    CerrarSesionComponent,
    ListarUsuarioComponent,
    CrearUsuarioComponent,
    EditarUsuarioComponent,
    EliminarUsuarioComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaModule,
    MatPaginatorModule
  ]
})
export class SeguridadModule { }
