import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario-logado',
  templateUrl: './usuario-logado.component.html',
  styleUrls: ['./usuario-logado.component.less']
})
export class UsuarioLogadoComponent implements OnInit {

  icone = 'active';
  sino = 'active';
  perfil = 'active';

  constructor() { }

  ngOnInit() {
  }
  Utilidades() {
    if ( this.icone === 'active') {
      this.icone  = 'a';
      this.perfil =  this.sino  = 'active';

    } else {
      this.icone = this.perfil = this.sino  = 'active';
    }
  }
  Perfil() {
    if ( this.perfil === 'active') {
      this.perfil = 'a';
      this.sino  = this.icone  = 'active';
    } else {
      this.perfil = this.sino  = this.icone  = 'active';
    }
  }
 Sino() {
    if ( this.sino === 'active') {
      this.sino  = 'a';
      this.icone  =  this.perfil = 'active';
    } else {
      this.sino = this.icone  = this.perfil = 'active';

    }
  }


}
