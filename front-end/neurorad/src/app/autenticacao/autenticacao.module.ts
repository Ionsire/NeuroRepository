import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutocadastroUsuariosComponent } from './autocadastro-usuarios/autocadastro-usuarios.component';
import { AutenticacaoUsuariosComponent } from './autenticacao-usuarios/autenticacao-usuarios.component';
import { RecuperacaoSenhaUsuariosComponent } from './recuperacao-senha-usuarios/recuperacao-senha-usuarios.component';

@NgModule({
  declarations: [AutocadastroUsuariosComponent, AutenticacaoUsuariosComponent, RecuperacaoSenhaUsuariosComponent],
  imports: [
    CommonModule
  ]
})
export class AutenticacaoModule { }
