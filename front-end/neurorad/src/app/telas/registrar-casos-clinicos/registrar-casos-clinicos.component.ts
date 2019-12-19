import { ViewCategorias } from './../../services/Classes/viewcategorias';
import { Categorias } from './../../services/Classes/Categorias';
import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Usuario } from 'src/app/services/Classes/usuario';
import { Router } from '@angular/router';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';

@Component({
  selector: 'app-registrar-casos-clinicos',
  templateUrl: './registrar-casos-clinicos.component.html',
  styleUrls: ['./registrar-casos-clinicos.component.less']
})
export class RegistrarCasosClinicosComponent implements OnInit {
  formulario: FormGroup;
  ArrayImagens: string[] = [];
  extencao : any;
  urls = new Array<string>();
  image: string = "";
  ImgsObjct = Array<any>();
  CapaImg: any;
  CapaSalva: number = 0;
  images: any[] =[]
  img_Capa_OK : boolean = false;
  Categoria$: Categorias = new Categorias();
  ViewCategorias : ViewCategorias = new  ViewCategorias();
  letra: string = '';
  Letras: string[] = [ 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y']
  MaxImg: number;
  cont : number = 0;
  select: Array<File> = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private service: AuthService,private router: Router, private _http: CasesService) { }

  // esta metodo abixo e só para testa ainda vai ser configurado corretamente
  classes: boolean[] = Array(
    true,
    false,
    false,
    false,
    false
  );
  toggle(arr_classes: boolean[], clicado) {
    for (var i = 0; i < arr_classes.length; i++) {
      this.classes[i] = false;
    }
    this.classes[clicado] = true;
  }

  userData: Usuario = new Usuario();

  ngOnInit() {
    // if(localStorage.getItem("token")){
    //   this.service.acessotoken(localStorage.getItem("token"));
    //  }
     AuthService.get('enviaUser').subscribe(data => this.PopulaForms(data));
     

    this.formulario = this.formBuilder.group({

      DS_HISTORIA_CLINICA: [null, Validators.required],
      DS_DISCUSSAO: [null, Validators.required],
      DS_REFERENCIAS: [null, Validators.required],
      DS_DIAGNOSTICO: [null, Validators.required],
      CO_CATEGORIA: [null, Validators.required],
      DS_ACHADOS_DAS_IMAGENS: [null, Validators.required],
      CO_USUARIO:[null, Validators.required],
      CO_IMAGEM_CAPA:[null, Validators.required],
      CO_STATUS: [1],

      // UPLOADCARE_PUB_KEY: ['demopublickey'],
      

    });
    
  }
  onSubmit() {
    // popular imagens capa 
            this.imagensCapaTopo();

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
          formData.append('CO_IMAGEM_CAPA', this.formulario.get('CO_IMAGEM_CAPA').value);
          formData.append('CO_IMAGEM_CAPA_EXTENCAO', this.extencao );
          
         //return console.log(formData.get('CO_IMAGEM_CAPA') , formData.get('CO_IMAGEM_CAPA_EXTENCAO') );


          for (var i = 0; i < this.ArrayImagens.length; i++) {
          formData.append('images[]', this.ArrayImagens[i]);
          }
          //this.http.post('http://localhost:8000/api/casoclinico', formData)
          this._http.creatCaso(formData)
            .subscribe(
              res => this.SucessoAlerta(),
              err => this.Erro(), 
            
            );
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
  detectFiles(event) {
    var TR : boolean = true;
    let files = event.target.files;
    if (files && this.ArrayImagens.length < 25) {
      for (let file of files) {
      
          if (this.validations(file)) {
            if (file.size < 2000000) {
              let reader = new FileReader();
              reader.onload = (e: any) => {
                if (this.ArrayImagens.length < 25) {
                  this.ArrayImagens.push(file);
                  //aqui ele adiciona no vetor o item e
                  this.urls.push(e.target.result);
                } else {
                  if( TR ){
                    TR = false;
                    return alert('Numero maxímo de imagens');
                  }
                 
                }
               
              };
              reader.readAsDataURL(file);
            } else {
              alert('tamanho Maxímo 2MB');
            }
          } else {
            alert('Imagem Invalidade');
          }

      }
    } else {

      alert('numero maximo de imagens');
    }
    this.img_Capa_OK = true;
  }
  ModalImg(x,y, index) {
    this.letra = index;
    this.image = x;
    this.CapaImg = y;
    this.cont = y;
    this.MaxImg = this.urls.length - 1;
  }
  validations(file) {
    var imagemJPG = ".jpg";
    var imagemPNG = ".png";
    if (file.name.search(imagemJPG) != -1) {
      return true;
    } else if (file.name.search(imagemPNG) != -1) {
        return true
    } else {
      return false;
    }
  }
  Delete(obj) {
    var i : number = obj;
    this.ArrayImagens.splice(obj , 1);
    this.urls.splice(obj, 1);
    if (i < this.CapaSalva) {
      this.CapaSalva = this.CapaSalva -1;
    } else if (i = this.CapaSalva) {
      this.CapaSalva = 0;
    }
  }
   SalvarCapa(capa) {
     
     this.CapaSalva = capa;
      
      
    alert('Capa salvar com sucesso');
   // this.Imgcapatopoview(capa)
   
   }
   imagensCapaTopo() {

    if (this.ArrayImagens.length >0) {
      let IMGCAPA :any;
      IMGCAPA = this.ArrayImagens[this.CapaSalva];
      this.extencao = IMGCAPA.name.slice(-4)
    
    } else {
      alert("Formulario invalido, verifique se todos os campos estãos preenchido juntos com as imgens, todos são obrigatorios! ")
      
    }
    

    //trocan a imagens antes de enviar para beck
    //var auxi: string;
    //auxi = this.ArrayImagens[this.CapaSalva];
    //this.ArrayImagens[this.CapaSalva] = this.ArrayImagens[0];
    //this.ArrayImagens[0] = auxi;

      this.formulario.patchValue({
    
        CO_IMAGEM_CAPA: this.CapaSalva,  
    });
    

   }
  MiniCard(x) {
    this.image = x;
  }
  // trocando imagens na view
  //Imgcapatopoview(x){
    //var AX : any;
   // AX = this.urls[0];
    //this.urls[0] =  this.urls[x];
    //this.urls[x] = AX;
  //}
  PopulaForms(User: Usuario) {
  this.formulario.patchValue({

    CO_USUARIO: User.CO_SEQ_USUARIO,  
});
}
SucessoAlerta() {
  alert(' Enviado com Sucesso');
  this.router.navigate(['home']);
}
Erro() {
  alert(' back-end Formualrio com erro ou Formulario Invalido!')
  this.verificarValidacoeFrom(this.formulario);
}
}
