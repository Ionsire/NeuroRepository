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
import { UsuarioCasosComponent } from './telas/usuario-casos/usuario-casos.component';
import { ReenviarCasoComponent } from './telas/reenviar-caso/reenviar-caso.component';
import { PlataformaComponent } from './telas/plataforma/plataforma.component';
import { GuardsGuard } from './guards/guards.guard';
import { RegistrarCasoGuardsGuard } from './guards/guardsRegistrarCaso/registrar-caso-guards.guard';
import { AdmGuard } from './guards/guardsAdm/adm.guard';




const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: PaginaInicialComponent},
  {path:  'home/plataforma', component : PlataformaComponent},
  { path: 'perfil', component: PerfilComponent, canActivate:[GuardsGuard]},
  { path: 'perfil/formulario', component: UsuarioFormComponent, canActivate:[GuardsGuard]},
  { path: 'perfil/meuscasos' , component: UsuarioCasosComponent, canActivate:[GuardsGuard]},
  { path: 'registrar', component: RegistrarCasosClinicosComponent, canActivate:[RegistrarCasoGuardsGuard]},
  { path: 'reenviarcaso/:id', component : ReenviarCasoComponent, canActivate:[RegistrarCasoGuardsGuard] },
  { path: 'Homologacao', component: HomologacaoComponent, canActivate:[AdmGuard] },
  { path: 'casos', component: CasosClinicosComponent},
  { path: 'casos/:id', component: CasosClinicosComponent},
  { path: 'viewcase/:id', component: ViewCaseComponent},
  { path: 'usuariopendecias', component: PendenciasUsuariosComponent,canActivate:[AdmGuard]},
  { path: 'colaboradores' , component: ColaboradoresComponent,canActivate:[AdmGuard]},
  {
    path: '**', component: PagesError404Component
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
