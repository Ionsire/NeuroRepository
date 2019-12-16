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
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { GuardsGuard } from './guards/guards.guard';
import { RegistrarCasoGuardsGuard } from './guards/guardsRegistrarCaso/registrar-caso-guards.guard';
import { AdmGuard } from './guards/guardsAdm/adm.guard';


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
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    Ng2SearchPipeModule
  
  

  ],
  providers: [ AuthService, CasesService,UsuarioService , GuardsGuard, RegistrarCasoGuardsGuard, AdmGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
