import { Component, OnInit, } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-registrar-casos-clinicos',
  templateUrl: './registrar-casos-clinicos.component.html',
  styleUrls: ['./registrar-casos-clinicos.component.less']
})
export class RegistrarCasosClinicosComponent implements OnInit {
  formulario: FormGroup;
  ArrayImagens: string[] = [];
  urls = new Array<string>();
  image: string = "../../../assets/images/imgneuro.jpg";
  ImgsObjct = Array<any>();
  CapaImg: any;
  CapaSalva: number = 0;
  images: any[] =[]


  select: Array<File> = null;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

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

  ngOnInit() {

    this.formulario = this.formBuilder.group({

      DS_HISTORIA_CLINICA: [null, Validators.required],
      DS_DISCUSSAO: [null, Validators.required],
      DS_REFERENCIAS: [null, Validators.required],
      DS_DIAGNOSTICO: [null, Validators.required],
      CO_CATEGORIA: [null, Validators.required],
      DS_ACHADOS_DAS_IMAGENS: [null, Validators.required],
      CO_USUARIO: [1],
      CO_STATUS: [1],

      // UPLOADCARE_PUB_KEY: ['demopublickey'],


    });
  }
  onSubmit() {
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
      this.imagensCapaTopo();
      console.log(this.ArrayImagens);
    
      for (var i = 0; i < this.ArrayImagens.length; i++) {
      formData.append('images[]', this.ArrayImagens[i]);
      }
      this.http.post('http://localhost:8000/api/casoclinico', formData)
        .subscribe(
          res => console.log(res),
          err => console.log(err)
        );
      alert("Enviado com sucesso!")
    } else {
      alert("Formulario invalido")
      console.log('formulario com erros');
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
    let files = event.target.files;
    if (files && this.ArrayImagens.length < 25) {
      for (let file of files) {
        if (this.ArrayImagens.length < 25) {
          if (this.validations(file)) {
            if (file.size < 2000000) {
              let reader = new FileReader();
              reader.onload = (e: any) => {
                this.ArrayImagens.push(file);
                //aqui ele adiciona no vetor o item e
                this.urls.push(e.target.result);
              };
              reader.readAsDataURL(file);
            } else {
              alert('tamanho Maxímo 2MB');
            }
          } else {
            alert('Imagem Invalidade');
          }

        } else {
          return alert('Numero maxímo de imagens');
        }
      }
    } else {

      alert('numero maximo de imagens');
    }
  }
  ModalImg(x,y) {
    this.image = x;
    this.CapaImg = y;
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
  console.log(this.ArrayImagens)
  }
   SalvarCapa(capa) {
     this.CapaSalva = capa;
    alert('Capa salvar com sucesso');
   }
   imagensCapaTopo() {
    var auxi: string;
    auxi = this.ArrayImagens[this.CapaSalva];
    this.ArrayImagens[this.CapaSalva] = this.ArrayImagens[0];
    this.ArrayImagens[0] = auxi;
   }
  MiniCard(x) {
    this.image = x;
  }
}
