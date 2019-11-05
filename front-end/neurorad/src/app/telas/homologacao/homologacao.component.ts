import { CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Categorias } from 'src/app/services/Classes/Categorias';
import { SubCategorias } from 'src/app/services/Classes/subcategorias';
import {NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-homologacao',
  templateUrl: './homologacao.component.html',
  styleUrls: ['./homologacao.component.less'],
  providers: [NgbDatepickerConfig] // add NgbDatepickerConfig to the component providers

})
export class HomologacaoComponent implements OnInit {

  CasosPendentes: CasoClinico[];
  CasosHomolagados: CasoClinico[];
  CasosAgendados: CasoClinico[];
  model: NgbDateStruct;
  formulario: FormGroup;
  ArrayImagens: string[] = [];
  image: string = "../../../assets/images/imgneuro.jpg";
  Categorias: Categorias = new Categorias();
  SubCategoria: SubCategorias = new SubCategorias();
  Sub_aux: string;
  auxiliar: string[] = [];

  tabela: boolean[] = Array(
    true,
    false,
    false
  );

  constructor(private formBuilder: FormBuilder, private _http: CasesService, config: NgbDatepickerConfig, calendar: NgbCalendar  ) {
                                                                  config.minDate = {year: 1900, month: 1, day: 1};
                                                                  config.maxDate = {year: 2099, month: 12, day: 31};
                                                                  // days that don't belong to current month are not visible
                                                                   config.outsideDays = 'hidden';

                                                                   // weekends are disabled
                                                                  config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) >= 2;
                            }
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
      CO_SEQ_CASO_CLINICO: [null, Validators.required],
      DS_HISTORIA_CLINICA: [null, Validators.required],
      DS_DISCUSSAO: [null, Validators.required],
      DS_REFERENCIAS: [null, Validators.required],
      DS_DIAGNOSTICO: [null, Validators.required],
      CO_CATEGORIA: [null, Validators.required],
      CO_SUBCATEGORIA: [null, Validators.required],
      DS_ACHADOS_DAS_IMAGENS: [null, Validators.required],
      DT_SEMANA: null,
      // UPLOADCARE_PUB_KEY: ['demopublickey'],
    });
  
    this._http.getCaseHomo()   // Editei para pegar os casos que estao pendentes de homologacao
      .subscribe(Response => this.CasosPendentes = Response,
        erro => console.log(erro)
      );
    this._http.listaHomologados().subscribe(Response => this.CasosHomolagados = Response, erro => console.log(erro));
    this._http.listaAgendados().subscribe(Response => this.CasosAgendados = Response, erro => console.log(erro));
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
      // troca id por CO_SEQ_CASO_CLINICO
      CO_SEQ_CASO_CLINICO: caso.CO_SEQ_CASO_CLINICO,
      DS_HISTORIA_CLINICA: caso.DS_HISTORIA_CLINICA,
      DS_DISCUSSAO: caso.DS_DISCUSSAO,
      DS_REFERENCIAS: caso.DS_REFERENCIAS,
      DS_DIAGNOSTICO: caso.DS_DIAGNOSTICO,
      CO_CATEGORIA: caso.CO_CATEGORIA,
      DS_ACHADOS_DAS_IMAGENS: caso.DS_ACHADOS_DAS_IMAGENS,
      CO_SUBCATEGORIA: caso.CO_SUBCATEGORIA,

    });
    this.SubCategorias();
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

  homologar() {
    if (this.formulario.valid ) {
      const formData = new FormData();
      formData.append('DS_HISTORIA_CLINICA', this.formulario.get('DS_HISTORIA_CLINICA').value);
      formData.append('DS_DISCUSSAO',this.formulario.get('DS_DISCUSSAO').value);
      formData.append('DS_REFERENCIAS',this.formulario.get('DS_REFERENCIAS').value);
      formData.append('DS_DIAGNOSTICO',this.formulario.get('DS_DIAGNOSTICO').value);
      formData.append('CO_CATEGORIA',this.formulario.get('CO_CATEGORIA').value);
      formData.append('DS_ACHADOS_DAS_IMAGENS',this.formulario.get('DS_ACHADOS_DAS_IMAGENS').value);
      formData.append('CO_SEQ_CASO_CLINICO',this.formulario.get('CO_SEQ_CASO_CLINICO').value);
      formData.append('CO_SUBCATEGORIA',this.formulario.get('CO_SUBCATEGORIA').value);

      this._http.homologar(formData).subscribe (resp => console.log(resp));

      this.ngOnInit ();
    } else {
      alert("Formulario invalido")
      this.verificarValidacoeFrom(this.formulario);
    }
    
  }
  SubCategorias() {

    if (this.formulario.get('CO_CATEGORIA').value) {
      let aux;
      aux = this.formulario.get('CO_CATEGORIA').value;
      this.Sub_aux = this.Categorias.categorias[aux-1].chave;
      this.auxiliar = this.SubCategoria[this.Sub_aux];
    } else {
      this.auxiliar = [];
    }
  }
  verificarValidacoeFrom(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup) {
        this.verificarValidacoeFrom(controle);
      }
    });
  }

  mostratabelas(arr_classes: boolean[], clicado) {
    for (var i = 0; i < arr_classes.length; i++) {
      this. tabela[i] = false;
    }
    this. tabela[clicado] = true;
    this.resep();
  }

  Agendar() {
    console.log(this.formulario.get('DT_SEMANA').value);
    if (this.formulario.get('DT_SEMANA').value) {

      var aux = null;
      aux = this.formulario.get('DT_SEMANA').value.year + '-' + this.formulario.get('DT_SEMANA').value.month + '-' + this.formulario.get('DT_SEMANA').value.day;
      this.formulario.patchValue({
        DT_SEMANA: aux
      });
      console.log(this.formulario.get('DT_SEMANA').value);
      if (this.formulario.get('CO_SEQ_CASO_CLINICO').value) {

        console.log(this.formulario.get('DT_SEMANA').value, this.formulario.get('CO_SEQ_CASO_CLINICO').value)
        this._http.agendarCaso(this.formulario.get('CO_SEQ_CASO_CLINICO').value, this.formulario.get('DT_SEMANA').value).subscribe(res => alert('Agendado com Sucesso'));
        this.ngOnInit()
      } else {

        alert('Nao a caso selecionado')
      }
    } else {
      alert('Data do agendamento e obrigatorio')
    }

  }
  Desagendar() {
    let confi;
    confi = confirm( 'deseja mesmo Desagendar?')
    if (confi) {
      if(this.formulario.get('CO_SEQ_CASO_CLINICO').value){
        this._http.desagendarCaso(this.formulario.get('CO_SEQ_CASO_CLINICO').value).subscribe(res => alert('Desagendado com Sucesso'));
        this.ngOnInit();
      }
      else{
        alert('nenhum caso selecionado')
      }
    } else {

    }
  }

  Disponibilizar(){
    let confi;
    confi = confirm( 'deseja mesmo Disponibilizar na base publica?')
    if (confi) {
      if(this.formulario.get('CO_SEQ_CASO_CLINICO').value){
        this._http.tornarCasoPublico(this.formulario.get('CO_SEQ_CASO_CLINICO').value).subscribe(res => alert('Disponibilizado com Sucesso'));
        this.ngOnInit();
      }
      else{
        alert('nenhum caso selecionado')
      }
    } else {
      
    }
  }

  

}
