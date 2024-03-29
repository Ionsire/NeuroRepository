import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { typeWithParameters } from '@angular/compiler/src/render3/util';

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
  cont2 : number = 0;
  code : string;
  autorprimary: any = 'Anônimo';
  autorsecondary: any[] = ['Anônimo','Anônimo'];
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
     erro =>alert('Erro, tente novamente mais tarde')
    );
  }

  Get( caso: CasoClinico[] ) {

    for ( var i = 0; i < caso.length; i++) {
     
     if (i==0) {
      this.service.autorCaso(caso[i].CO_USUARIO).subscribe(resp => this.autorprimary = resp)
       this.PrimaryCase = caso[i];
       if( this.PrimaryCase.DS_HISTORIA_CLINICA.length > 235){
       this.PrimaryCase.DS_HISTORIA_CLINICA = this.PrimaryCase.DS_HISTORIA_CLINICA.slice(0, 240) + '...';
      }
     } else {
      this.service.autorCaso(caso[i].CO_USUARIO).subscribe(resp => this.populaAutor(resp))
       this.SecundaryCase[(i-1)] = caso[i];
       if( this.SecundaryCase[(i-1)].DS_HISTORIA_CLINICA.length > 235){
       this.SecundaryCase[(i-1)].DS_HISTORIA_CLINICA = this.SecundaryCase[(i-1)].DS_HISTORIA_CLINICA.slice(0, 240) + '...';
       }
     }
  }
}
populaAutor(autor){
  if (this.cont2 == 0) {
    this.cont2 = this.cont2 +1;
    this.autorsecondary[0] = autor;
  } else {
    this.autorsecondary[1] = autor;
  }
 
}
VisualizarCaso(id) {
  this.router.navigate(['viewcase', id ])
 }
 

}
