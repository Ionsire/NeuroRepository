import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Usuario } from 'src/app/services/Classes/usuario';
import { AtributosUser } from 'src/app/services/Classes/atributos';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { ViewCategorias } from 'src/app/services/Classes/viewcategorias';
import { ViewSubCategorias } from 'src/app/services/Classes/viewsubcategoria';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {

  casosclinicos: CasoClinico[];
  casoClinicosEnviados: Array<CasoClinico> = [];
  casoClinicosAprovados: Array<CasoClinico> = [];
  casoClinicosRetornados: Array<CasoClinico> = [];
  hostApi: string = "http://localhost:8000/";
  categoriacaso : string = null;
  subcategoriacaso: string = null;
  atributoss: ViewCategorias = new ViewCategorias();
  atributoSUb: ViewSubCategorias =  new ViewSubCategorias();

  ArrayImagens: string[] = [];
  imgCapa: any = null;
   active: number = 1;
   Letras: string[] = [ 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y']

   asstesAviso : boolean = false;

  casoClinicosAxiliar: CasoClinico = null;

  userData: Usuario = null;
  atributos : AtributosUser = new AtributosUser();
  classes: boolean[] = Array(
    true,
    false,
    false,
    false
  );
  clscasos: boolean[] = Array(
    true,
    false,
    false,
    false,
    false
  );

  cont : number = 1;

  constructor(private modalService: NgbModal,private service: AuthService,private _http: CasesService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("token")){
      this.service.acessotoken(localStorage.getItem("token"));
     }
     AuthService.get('enviaUser').subscribe(data => this.getuser(data))
  }

  getuser(usuario:Usuario){

    if(usuario.CO_STATUS == 2) {
      this.userData = usuario;
      this.userData.CO_PAPEL = '6';
    }else{
      this.userData = usuario;
    }  
    // esta chamdo mais de uma vez por isso o contador
    if(this.cont  == 1){
      this.cont  =0;
   this._http.meusCasos(this.userData.CO_SEQ_USUARIO).subscribe(Response => this.getCasos(Response))
    }
  }
getCasos(casos: CasoClinico[]){
  
  this.casosclinicos = casos;
  

  for (let index = 0; index < this.casosclinicos.length; index++) {
    if (this.casosclinicos[index].CO_STATUS >= 2 && this.casosclinicos[index].CO_STATUS <= 5 ) {
  
      this.casoClinicosAprovados.push(this.casosclinicos[index])
      
    } else if (this.casosclinicos[index].CO_STATUS == 7){
      
      this.asstesAviso = true;
      this.casoClinicosRetornados.push(this.casosclinicos[index])
      
    }else if(this.casosclinicos[index].CO_STATUS == 1){
      
      this.casoClinicosEnviados.push(this.casosclinicos[index])

    } 

  }

}


ViewCase(content, id) { 

  let auxilixacategorias

  this._http.casoAdm(id).subscribe(Response => this.populaIMG(Response.images));

  for (let index = 0; index < this.casosclinicos.length; index++) {
     
    if(this.casosclinicos[index].CO_SEQ_CASO_CLINICO == id ){
     // console.log(this.casosclinicos[index].CO_IMAGEM_CAPA)
      this.casoClinicosAxiliar = this.casosclinicos[index];
      auxilixacategorias = this.atributoss.Chaves[ this.casoClinicosAxiliar.CO_CATEGORIA]
      this.categoriacaso = this.atributoss.Categorias[this.casoClinicosAxiliar.CO_CATEGORIA]
      this.subcategoriacaso =  this.atributoSUb[auxilixacategorias][this.casoClinicosAxiliar.CO_SUBCATEGORIA]

      
      break
    }
    
  }
  this.modalService.open(content, {size: 'xl'});
}
  // pegando as imagens dos casos direto do response do servidor
  populaIMG(imagens){
   
    this.ArrayImagens = imagens;
    
    //console.log('ArrayImagens',this.ArrayImagens)
  }


  toggle(arr_classes: boolean[], clicado) {
    for (var i = 0; i < arr_classes.length; i++) {
      this.classes[i] = false;
    }
    this.classes[clicado] = true;
  }

  
  togglecaso(arr_classes: boolean[], clicado) {
    for (var i = 0; i < arr_classes.length; i++) {
      this.clscasos[i] = false;
    }
    this.clscasos[clicado] = true;
  }

  reenviar(id) {
      var element = document.getElementById('close')
      element.click()
    this.router.navigate(['reenviarcaso', id ])
   
   }

}
