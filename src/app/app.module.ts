import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './public/template/footer/footer.component';
import { NotFoundComponent } from './public/error/not-found/not-found.component';
import { InternalServerErrorComponent } from './public/error/internal-server-error/internal-server-error.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './modules/shared/shared.module';
import { InicioComponent } from './public/general/inicio/inicio.component';
import { InvitacionEvaluarModule } from './modules/invitacion-evaluar/invitacion-evaluar.module';
import { SidenavComponent } from './public/template/sidebar/sidenav/sidenav.component';
import { CardsComponent } from './public/template/cards/cards.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthTokenInterceptor } from './interceptors/auth-token.interceptors';


@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NotFoundComponent,
    InternalServerErrorComponent,
    InicioComponent,
    SidenavComponent,
    CardsComponent,
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
  providers: [
    /* {
      provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true
    } */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
