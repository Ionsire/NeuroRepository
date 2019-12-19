import { Component, OnInit } from '@angular/core';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';
import { Usuario } from 'src/app/services/Classes/usuario';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuario-casos',
  templateUrl: './usuario-casos.component.html',
  styleUrls: ['./usuario-casos.component.less']
})
export class UsuarioCasosComponent implements OnInit {

  casosclinicos: CasoClinico[];
  casoClinicosEnviados: Array<CasoClinico> = []
  casoClinicosAprovados: Array<CasoClinico> = []
  casoClinicosRetornados: Array<CasoClinico> = []

  casoClinicosAxiliar: CasoClinico[];


  active: number = 1;
  titulotabela : string = 'Casos enviados'
  userData: Usuario= new Usuario();

  constructor(private modalService: NgbModal,private _http: CasesService, private service: AuthService) { }

  ngOnInit() {
     AuthService.get('enviaUser').subscribe(data => this.getuser(data) )
  }

  getuser(usuario:Usuario){  
      this.userData = usuario;
     this._http.meusCasos(this.userData.CO_SEQ_USUARIO).subscribe(Response => this.getCasos(Response))
  }
 
  getCasos(casos: CasoClinico[]){

    this.casosclinicos = casos;
    
  
    for (let index = 0; index < this.casosclinicos.length; index++) {
      //console.log(this.casosclinicos[index].CO_STATUS)
      if (this.casosclinicos[index].CO_STATUS == 2) {
       
        this.casoClinicosAprovados.push(this.casosclinicos[index])
        
      } else if (this.casosclinicos[index].CO_STATUS == 7){
    
        this.casoClinicosRetornados.push(this.casosclinicos[index])
        
      }else if(this.casosclinicos[index].CO_STATUS == 1){
     
        this.casoClinicosEnviados.push(this.casosclinicos[index])
  
      } 
  
    }
   this.casoClinicosAxiliar = this.casoClinicosAprovados;
  
  }
  Casosenviados(){
    this.active = 1;
    this.titulotabela = 'Casos enviados'
    this.casoClinicosAxiliar = this.casoClinicosEnviados
  }
  Retornados(){
    this.active = 2;
    this.titulotabela = 'Retornados'
    this.casoClinicosAxiliar = this.casoClinicosRetornados
  }
  Aprovados(){
    this.active = 3;
    this.titulotabela = ' Aprovados'
    this.casoClinicosAxiliar = this.casoClinicosAprovados
  }
  ViewCase(content,  a ) {
    this.modalService.open(content, { centered: true });
    
  }

}

