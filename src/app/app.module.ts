import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginatorModule} from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './public/template/header/header.component';
import { FooterComponent } from './public/template/footer/footer.component';
import { NotFoundComponent } from './public/error/not-found/not-found.component';
import { InternalServerErrorComponent } from './public/error/internal-server-error/internal-server-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { InicioComponent } from './public/general/inicio/inicio.component';
import { InvitacionEvaluarModule } from './modules/invitacion-evaluar/invitacion-evaluar.module';
import { ListarComiteComponent } from './modules/parametros/comite/listar-comite/listar-comite.component';
import { SidenavComponent } from './public/template/sidebar/sidenav/sidenav.component';
import { CardsComponent } from './public/template/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { ListarFacultadComponent } from './modules/parametros/facultad/listar-facultad/listar-facultad.component';
import { CrearFacultadComponent } from './modules/parametros/facultad/crear-facultad/crear-facultad.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActualizarFacultadComponent } from './modules/parametros/facultad/actualizar-facultad/actualizar-facultad.component';
import { EliminarFacultadComponent } from './modules/parametros/facultad/eliminar-facultad/eliminar-facultad.component';
import { CrearDepartamentoComponent } from './modules/parametros/departamento/crear-departamento/crear-departamento.component';
import { CrearUsuarioComponent } from './modules/seguridad/crear-usuario/crear-usuario.component';
import { ActualizarDepartamentoComponent } from './modules/parametros/departamento/actualizar-departamento/actualizar-departamento.component';
import { EliminarDepartamentoComponent } from './modules/parametros/departamento/eliminar-departamento/eliminar-departamento.component';
import { EditarUsuarioComponent } from './modules/seguridad/editar-usuario/editar-usuario.component';
//import { InicioSesionComponent } from './modules/seguridad/inicio-sesion/inicio-sesion.component'


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    InicioComponent,
    ListarComiteComponent,
    ListarFacultadComponent,
    CrearFacultadComponent,
    ActualizarFacultadComponent,
    EliminarFacultadComponent,
    CrearDepartamentoComponent,
    ActualizarDepartamentoComponent,
    EliminarDepartamentoComponent,
    SidenavComponent,
    CardsComponent,
    //InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    InvitacionEvaluarModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
