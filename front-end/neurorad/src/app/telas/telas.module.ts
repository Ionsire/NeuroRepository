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





@NgModule({
  declarations: [
    PaginaInicialComponent,
    RegistrarCasosClinicosComponent,
    CasosClinicosComponent,
    ViewCaseComponent,
    HomologacaoComponent,
    UsuarioFormComponent,
    PendenciasUsuariosComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    AppRoutingModule
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
