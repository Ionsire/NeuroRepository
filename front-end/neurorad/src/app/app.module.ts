import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponenteMenuModule } from './Componentes-Menu-principal/componente-menu.module';
import { TelasModule } from './telas/telas.module';
import { AuthService } from './services/authentication/auth.service';
import {HttpClientModule} from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';
import { CasesService } from './services/Casos-Clinicos/cases.service';
import { UsuarioService } from './services/UsuarioService/usuario.service';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponenteMenuModule,
    TelasModule,
    HttpClientModule,
    NgxPaginationModule,
  

  ],
  providers: [ AuthService, CasesService,UsuarioService],
  bootstrap: [AppComponent]
})
export class AppModule { }
