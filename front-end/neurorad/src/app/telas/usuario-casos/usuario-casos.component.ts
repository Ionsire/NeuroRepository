import { Component, OnInit } from '@angular/core';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';

@Component({
  selector: 'app-usuario-casos',
  templateUrl: './usuario-casos.component.html',
  styleUrls: ['./usuario-casos.component.less']
})
export class UsuarioCasosComponent implements OnInit {

  casosclinicos: CasoClinico[];

  active: number = 1;
  titulotabela : string = 'Casos enviados'

  constructor(private _http: CasesService) { }

  ngOnInit() {
   this._http.meusCasos(7).subscribe(responser => this.casosclinicos = responser)

  }

  Casosenviados(){
    this.active = 1;
    this.titulotabela = 'Casos enviados'
  }
  Retornados(){
    this.active = 2;
    this.titulotabela = 'Retornados'
  }
  Aprovados(){
    this.active = 3;
    this.titulotabela = ' Aprovados'
  }



}
