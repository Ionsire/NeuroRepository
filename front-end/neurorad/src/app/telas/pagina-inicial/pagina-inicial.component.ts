import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.less']
})
export class PaginaInicialComponent implements OnInit {


 private PrimaryCase: CasoClinico;
 private SecundaryCase: CasoClinico[] = [] ;
 private selectCaso: CasoClinico[] = [] ;
  condicoes: boolean = false;
  Index: number[];
  cont : number = 0;
  code : string;
  private token;

  constructor( private service: CasesService, private router: Router,private route: ActivatedRoute, private auth: AuthService) { }


  hostApi: string = "http://localhost:8000/storage/images/";
  



  ngOnInit() {
// pegando responser do sabia com queryparams
  if(this.route.snapshot.queryParamMap.get("code")) {
   this.code = this.route.snapshot.queryParamMap.get("code")
   this.route.queryParamMap.subscribe(queryParams =>{ this.code = queryParams.get("code")})

  this.token = this.auth.Loginn(this.code);

  this.router.navigate(['home']);

  }
    this.service.getCaseSemana().
    subscribe(
     // responser => this.Get(responser) ,
     // erro => console.log(erro)
     Response => {
        for (let index = 0; index <  Response.length; index++) {
          if ( Response[index].CO_STATUS == 4 && this.cont <= 2) {
              this.selectCaso[this.cont] =  Response[index];
              this.cont = this.cont + 1;
          }
        }
        this.Get(this.selectCaso);
     },
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
VisualizarCaso(id) {
  this.router.navigate(['viewcase', id ])
 }

}
