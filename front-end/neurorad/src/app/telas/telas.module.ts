import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { PaginaInicialComponent } from './pagina-inicial/pagina-inicial.component';
import { RegistrarCasosClinicosComponent } from './registrar-casos-clinicos/registrar-casos-clinicos.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CasosClinicosComponent } from './casos-clinicos/casos-clinicos.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { ViewCaseComponent } from './view-case/view-case.component';
import { AppRoutingModule } from '../app-routing.module';
import { HomologacaoComponent } from './homologacao/homologacao.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { PendenciasUsuariosComponent } from './pendencias-usuarios/pendencias-usuarios.component';
import { PerfilComponent } from './perfil/perfil.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { PagesError404Component } from './pages-error404/pages-error404.component';
import { ColaboradoresComponent } from './colaboradores/colaboradores.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';




@NgModule({
  declarations: [
    PaginaInicialComponent,
    RegistrarCasosClinicosComponent,
    CasosClinicosComponent,
    ViewCaseComponent,
    HomologacaoComponent,
    UsuarioFormComponent,
    PendenciasUsuariosComponent,
    PerfilComponent,
    PagesError404Component,
    ColaboradoresComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    Ng2SearchPipeModule
  
  ],
  exports: [
    PaginaInicialComponent,
    RegistrarCasosClinicosComponent,
    CasosClinicosComponent,
    ViewCaseComponent,
    HomologacaoComponent
  ]
})
export class TelasModule { }
