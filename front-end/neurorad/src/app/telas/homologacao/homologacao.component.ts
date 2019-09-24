import { CasoClinico } from 'src/app/services/Casos-Clinicos/caso';
import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-homologacao',
  templateUrl: './homologacao.component.html',
  styleUrls: ['./homologacao.component.less']
})
export class HomologacaoComponent implements OnInit {

  CasosPendentes: CasoClinico[];
  formulario: FormGroup;
  ArrayImagens: string[] = [];
  urls = new Array<string>();
  image: string = "../../../assets/images/imgneuro.jpg";
  ImgsObjct = Array<any>();
  CapaImg: any;
  CapaSalva: number = 0;
  images: any[] =[]

  constructor(private formBuilder: FormBuilder, private _http: CasesService) { }
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
      CO_SUB_CATEGORIA: [null, Validators.required],
      DS_ACHADOS_DAS_IMAGENS: [null, Validators.required],
      CO_USUARIO: [1],
      CO_STATUS: [1],
      // UPLOADCARE_PUB_KEY: ['demopublickey'],
    });
    this._http.getCase()
    .subscribe(Response => this.CasosPendentes = Response,
      erro => console.log(erro)
      );
  }
  aplicaCssErro(campo) {

    return {
      'is-invalid': this.verificarValidTouched(campo)
    };
  }
  verificarValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  PopulaForms(caso: CasoClinico) {
    this.resep();
    this.formulario.patchValue({
      DS_HISTORIA_CLINICA: caso.DS_HISTORIA_CLINICA,
      DS_DISCUSSAO: caso.DS_DISCUSSAO,
      DS_REFERENCIAS: caso.DS_REFERENCIAS,
      DS_DIAGNOSTICO: caso.DS_DIAGNOSTICO,
      CO_CATEGORIA: caso.CO_CATEGORIA,
      DS_ACHADOS_DAS_IMAGENS: caso.DS_ACHADOS_DAS_IMAGENS
    });
  }
  resep() {
    this.formulario.patchValue({
      DS_HISTORIA_CLINICA: null,
      DS_DISCUSSAO: null,
      DS_REFERENCIAS: null,
      DS_DIAGNOSTICO: null,
      CO_CATEGORIA: null,
      DS_ACHADOS_DAS_IMAGENS: null
    });
  }

}
