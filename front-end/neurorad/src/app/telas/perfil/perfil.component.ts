import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Usuario } from 'src/app/services/Classes/usuario';
import { AtributosUser } from 'src/app/services/Classes/atributos';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {

  casosclinicos: CasoClinico[];
  casoClinicosEnviados: Array<CasoClinico> = []
  casoClinicosAprovados: Array<CasoClinico> = []
  casoClinicosRetornados: Array<CasoClinico> = []
  active: number = 1;

  casoClinicosAxiliar: CasoClinico = null;

  userData: Usuario = null;
  atributos : AtributosUser = new AtributosUser();
  classes: boolean[] = Array(
    true,
    false,
    false,
    false
  );
  cont : number = 1;

  constructor(private modalService: NgbModal,private service: AuthService,private _http: CasesService) { }

  ngOnInit() {
    if(localStorage.getItem("token")){
      this.service.acessotoken(localStorage.getItem("token"));
     }
     AuthService.get('enviaUser').subscribe(data => this.getuser(data))
  }

  getuser(usuario:Usuario){

    if(usuario.CO_STATUS ==2) {
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
    if (this.casosclinicos[index].CO_STATUS == 2) {
  
      this.casoClinicosAprovados.push(this.casosclinicos[index])
      
    } else if (this.casosclinicos[index].CO_STATUS == 7){
      
      this.casoClinicosRetornados.push(this.casosclinicos[index])
      
    }else if(this.casosclinicos[index].CO_STATUS == 1){
      
      this.casoClinicosEnviados.push(this.casosclinicos[index])

    } 

  }

}

ViewCase(content, id) {
  this.casoClinicosAxiliar = null;
  for (let index = 0; index < this.casosclinicos.length; index++) {
     
    if(this.casosclinicos[index].CO_SEQ_CASO_CLINICO == id ){
      this.casoClinicosAxiliar = this.casosclinicos[index]
      break
    }
    
  }
  this.modalService.open(content, { centered: true });
  
}



  toggle(arr_classes: boolean[], clicado) {
    for (var i = 0; i < arr_classes.length; i++) {
      this.classes[i] = false;
    }
    this.classes[clicado] = true;
  }

}
