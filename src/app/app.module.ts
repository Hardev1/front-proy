import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

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
    SidenavComponent,
    CardsComponent
    //InicioSesionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    InvitacionEvaluarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
