import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaginaInicialComponent } from './telas/pagina-inicial/pagina-inicial.component';
import { RegistrarCasosClinicosComponent } from './telas/registrar-casos-clinicos/registrar-casos-clinicos.component';
import { CasosClinicosComponent } from './telas/casos-clinicos/casos-clinicos.component';
import { ViewCaseComponent } from './telas/view-case/view-case.component';
import { HomologacaoComponent } from './telas/homologacao/homologacao.component';
import { UsuarioFormComponent } from './telas/usuario-form/usuario-form.component';
import { PendenciasUsuariosComponent } from './telas/pendencias-usuarios/pendencias-usuarios.component';
import { PerfilComponent } from './telas/perfil/perfil.component';
import { PagesError404Component } from './telas/pages-error404/pages-error404.component';
import { ColaboradoresComponent } from './telas/colaboradores/colaboradores.component';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PaginaInicialComponent},
  { path: 'home/?:id', component: PaginaInicialComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'registrar', component: RegistrarCasosClinicosComponent},
  { path: 'casos', component: CasosClinicosComponent},
  { path: 'casos/:id', component: CasosClinicosComponent},
  { path: 'Homologacao', component: HomologacaoComponent},
  { path: 'viewcase/:id', component: ViewCaseComponent},
  { path: 'perfil/formulario', component: UsuarioFormComponent},
  { path: 'usuariopendecias', component: PendenciasUsuariosComponent},
  { path: 'colaboradores' , component: ColaboradoresComponent},

  {
    path: '**', component: PagesError404Component
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
