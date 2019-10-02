import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';

@Component({
  selector: 'app-usuario-logado',
  templateUrl: './usuario-logado.component.html',
  styleUrls: ['./usuario-logado.component.less']
})
export class UsuarioLogadoComponent implements OnInit {


  UsuariosPendentes: number = 0;
  CasosPendentes: number = 0;

  constructor( private _http: UsuarioService , private _http1: CasesService) { }

  ngOnInit() {
    this._http.GET().subscribe(
      response => this.UsuariosPendentes = response.length,
      erro => console.log(erro)
    );
    this._http1.getCaseHomo()
    .subscribe(Response => this.CasosPendentes = Response.length,
      erro => console.log(erro)
      );
  }

}
