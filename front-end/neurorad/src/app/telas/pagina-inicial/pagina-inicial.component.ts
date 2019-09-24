import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { CasoClinico } from 'src/app/services/Casos-Clinicos/caso';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.less']
})
export class PaginaInicialComponent implements OnInit {


 private PrimaryCase: CasoClinico;
 private SecundaryCase: CasoClinico[] = [] ;
  condicoes: boolean = false;
  Index: number[];

  constructor( private service: CasesService, private router: Router) { }

  ngOnInit() {

    this.service.getCaseSemana().
    subscribe(
      responser => this.Get(responser) ,
      erro => console.log(erro)
    );
  }

  Get( caso: CasoClinico[] ) {

    for ( var i = 0; i < caso.length; i++) {

     if (i==0) {
       this.PrimaryCase = caso[i];

     } else {
       this.SecundaryCase[(i-1)] = caso[i];
       this.condicoes = true;
     }
  }


}
VisualizarCaso(id){
  this.router.navigate(['viewcase',id])
 }

}
