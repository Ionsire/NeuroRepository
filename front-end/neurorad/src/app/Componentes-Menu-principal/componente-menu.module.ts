import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BntDoMenuComponent } from './bnt-do-menu/bnt-do-menu.component';
import { BrowserModule } from '@angular/platform-browser';
import { UsuarioLogadoComponent } from './usuario-logado/usuario-logado.component';
import { SabiaEnterComponent } from './sabia-enter/sabia-enter.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
   BntDoMenuComponent,
   UsuarioLogadoComponent,
   SabiaEnterComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule
  ],
  exports: [
    BntDoMenuComponent,
    UsuarioLogadoComponent,
    SabiaEnterComponent,
  ]
})
export class ComponenteMenuModule { }
