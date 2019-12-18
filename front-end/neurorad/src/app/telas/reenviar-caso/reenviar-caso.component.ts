import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categorias } from 'src/app/services/Classes/Categorias';
import { ViewCategorias } from 'src/app/services/Classes/viewcategorias';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from 'src/app/services/Classes/usuario';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { switchMap, map } from 'rxjs/operators';
import { ObservableInput } from 'rxjs';

@Component({
  selector: 'app-reenviar-caso',
  templateUrl: './reenviar-caso.component.html',
  styleUrls: ['./reenviar-caso.component.less']
})
export class ReenviarCasoComponent implements OnInit {

  casosclinicos: CasoClinico[];
  casoClinicosRetornados: CasoClinico =  new CasoClinico();
  formulario: FormGroup;
  ArrayImagens: string[] = [];
  hostApi: string = "http://localhost:8000/"
  image: string = "";
  Categoria$: Categorias = new Categorias();
  ViewCategorias : ViewCategorias = new  ViewCategorias();
  letra: string = '';
  Letras: string[] = [ 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y']
  MaxImg: number;
  cont : number = 0;
  contf : number = 1;

  id : number;

  userData: Usuario = new Usuario();

  constructor( private formBuilder: FormBuilder, private http: HttpClient, private service: AuthService,private router: Router,  private _http: CasesService,private Route: ActivatedRoute) { }

  ngOnInit() {

    if(localStorage.getItem("token")){
      this.service.acessotoken(localStorage.getItem("token"));
     }
     AuthService.get('enviaUser').subscribe(data => this.getuser(data));
     

    this.formulario = this.formBuilder.group({

      DS_HISTORIA_CLINICA: [null, Validators.required],
      DS_DISCUSSAO: [null, Validators.required],
      DS_REFERENCIAS: [null, Validators.required],
      DS_DIAGNOSTICO: [null, Validators.required],
      CO_CATEGORIA: [null, Validators.required],
      DS_ACHADOS_DAS_IMAGENS: [null, Validators.required],
      CO_USUARIO:[null, Validators.required],
      DS_CORRECOES: [null],
      CO_STATUS: [1],
      
    });
  }
  
  getuser(usuario:Usuario){

      this.userData = usuario;
     
    // esta inicainado mais de uma vez por isso o contador
    if(this.contf  == 1){
      this.contf  = 0;
   this._http.meusCasos(this.userData.CO_SEQ_USUARIO).subscribe(Response =>  this.getCasos(Response))
    }
  }

  getCasos(casos: CasoClinico[]){
    this.casosclinicos = casos;
    for (let index = 0; index < this.casosclinicos.length; index++) {
      if(this.casosclinicos[index].CO_STATUS == 7  && this.casosclinicos[index].CO_SEQ_CASO_CLINICO == this.Route.snapshot.params.id) {
        this.PopulaForms(this.casosclinicos[index])
      } 
    }
  
  }
  PopulaForms(caso: CasoClinico) {
  //  console.log(this.NU_REJEICOES)
    //console.log(caso);
    this.id = caso.CO_SEQ_CASO_CLINICO;

   
   this._http.casoAdm(caso.CO_SEQ_CASO_CLINICO).subscribe(Response => this.populaIMG(Response.images));
   this.resep();
    this.formulario.patchValue({
      // troca id por CO_SEQ_CASO_CLINICO
      CO_SEQ_CASO_CLINICO: caso.CO_SEQ_CASO_CLINICO,
      DS_HISTORIA_CLINICA: caso.DS_HISTORIA_CLINICA,
      DS_DISCUSSAO: caso.DS_DISCUSSAO,
      DS_REFERENCIAS: caso.DS_REFERENCIAS,
      DS_DIAGNOSTICO: caso.DS_DIAGNOSTICO,
      CO_CATEGORIA: caso.CO_CATEGORIA,
      DS_ACHADOS_DAS_IMAGENS: caso.DS_ACHADOS_DAS_IMAGENS,
      DS_CORRECOES: caso.DS_CORRECOES,
      CO_USUARIO:this.userData.CO_SEQ_USUARIO

    });
    
  }
  resep() {
    this.formulario.patchValue({
      DS_HISTORIA_CLINICA: null,
      DS_DISCUSSAO: null,
      DS_REFERENCIAS: null,
      DS_DIAGNOSTICO: null,
      CO_CATEGORIA: null,
      DS_ACHADOS_DAS_IMAGENS: null,
      CO_SUBCATEGORIA: null,
      DT_SEMANA:null,
    });
  }
   // pegando as imagens dos casos direto do response do servidor
   populaIMG(imagens){
    this.ArrayImagens = imagens;
    //console.log('ArrayImagens',this.ArrayImagens)
  }

  onSubmit() {

    //console.log('http://localhost:8000/api/reenvia'+ '/' + this.id)
    
  
    if (this.formulario.valid && this.ArrayImagens.length >0) {
      //enviar para o servidor
      const formData = new FormData();
      formData.append('DS_HISTORIA_CLINICA', this.formulario.get('DS_HISTORIA_CLINICA').value);
      formData.append('DS_DISCUSSAO', this.formulario.get('DS_DISCUSSAO').value);
      formData.append('DS_REFERENCIAS', this.formulario.get('DS_REFERENCIAS').value);
      formData.append('DS_DIAGNOSTICO', this.formulario.get('DS_DIAGNOSTICO').value);
      formData.append('CO_CATEGORIA', this.formulario.get('CO_CATEGORIA').value);
      formData.append('DS_ACHADOS_DAS_IMAGENS', this.formulario.get('DS_ACHADOS_DAS_IMAGENS').value);
      formData.append('CO_USUARIO', this.formulario.get('CO_USUARIO').value);
      formData.append('CO_STATUS', this.formulario.get('CO_STATUS').value);
      //console.log(this.formulario.get('CO_CATEGORIA').value);

      //console.log(this.id)

      this._http.reenviarCasoUser(this.id,formData).subscribe(
        res => this.SucessoAlerta(),
        err => this.Erro(),
      
      );

      //this.http.post('http://localhost:8000/api/reenviar'+ '/' + this.id, formData)
        
    } else {
      alert("Formulario invalido, verifique se todos os campos estãos preenchido juntos com as imgens, todos são obrigatorios! ")
      this.verificarValidacoeFrom(this.formulario);
    }

}
// validaçoes de formularios completos para todos os formularios
verificarValidacoeFrom(formGroup: FormGroup) {
Object.keys(formGroup.controls).forEach(campo => {
  const controle = formGroup.get(campo);
  controle.markAsTouched();
  if (controle instanceof FormGroup) {
    this.verificarValidacoeFrom(controle);
  }
});
}
verificarValidTouched(campo) {

return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
}

aplicaCssErro(campo) {

return {
  'is-invalid': this.verificarValidTouched(campo)
};
}
SucessoAlerta() {
alert(' Enviado com Sucesso');
this.router.navigate(['home']);
}
Erro() {
alert(' back-end Formualrio com erro ou Formulario Invalido!')
this.verificarValidacoeFrom(this.formulario);
}
ModalImg(url,index, LT) {
  this.letra = LT;
  this.image = this.hostApi + url;
  this.cont = index;
  this.MaxImg = this.ArrayImagens.length - 1;
}
}

