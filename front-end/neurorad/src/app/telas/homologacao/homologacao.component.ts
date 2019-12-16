import { CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ControlContainer } from '@angular/forms';
import { Categorias } from 'src/app/services/Classes/Categorias';
import { SubCategorias } from 'src/app/services/Classes/subcategorias';
import {NgbDatepickerConfig, NgbCalendar, NgbDate, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { ViewCategorias } from 'src/app/services/Classes/viewcategorias';
import { ViewSubCategorias } from 'src/app/services/Classes/viewsubcategoria';

@Component({
  selector: 'app-homologacao',
  templateUrl: './homologacao.component.html',
  styleUrls: ['./homologacao.component.less'],
  providers: [NgbDatepickerConfig], // add NgbDatepickerConfig to the component providers
  encapsulation: ViewEncapsulation.None,

})
export class HomologacaoComponent implements OnInit {
  
  Letras: string[] = [ 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y']
  letra: string = '';
  MaxImg: number;
  cont : number = 0;
  imagem: string;
  imagensDeletadas : any[] = [];
  contDelete: number = 0;

  CasosPendentes: CasoClinico[];
  CasosHomolagados: CasoClinico[];
  CasosAgendados: CasoClinico[];
  model: NgbDateStruct;
  formulario: FormGroup;
  formularioRenvio: FormGroup;
  ArrayImagens: string[] = [];
  image: string = "";
  Categorias: Categorias = new Categorias();
  SubCategoria: SubCategorias = new SubCategorias();
  Sub_aux: string;
  auxiliar: string[] = [];
  NU_REJEICOES : any;
  hostApi: string = "http://localhost:8000/";
  tabela: boolean[] = Array(
    true,
    false,
    false
  );
  atributos: ViewCategorias = new ViewCategorias();
  atributoSUb: ViewSubCategorias =  new ViewSubCategorias();
  textCategoria : any = '';
  textSubcategoria: any = '';
  auxilixacategorias : any = '';

  date : Date = new Date();
  dia : any = this.date.getDate()
  month: any = this.date.getMonth() +1;
  year: any = this.date.getUTCFullYear()

  

  constructor(private router: Router,private modalService: NgbModal, private formBuilder: FormBuilder, private _http: CasesService, config: NgbDatepickerConfig, calendar: NgbCalendar  ) {
                                                                  config.minDate = {year: this.year, month: this.month, day: this.dia};
                                                                  config.maxDate = {year: 2099, month: 12, day: 31};
                                                                  // days that don't belong to current month are not visible
                                                                   config.outsideDays = 'hidden';

                                                                   // weekends are disabled
                                                                  config.markDisabled = (date: NgbDate) => calendar.getWeekday(date) !=2;
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
    this.auxilixacategorias = null;
    this.textCategoria = null;
    this.textSubcategoria =  '';
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
    this.formularioRenvio = this.formBuilder.group({
      DS_CORRECOES: [null, Validators.required],
      CO_SEQ_CASO_CLINICO: [null, Validators.required],
    });
  
    this._http.getCaseHomo()   // Editei para pegar os casos que estao pendentes de homologacao
      .subscribe(Response => this.CasosPendentes = Response,
        erro => alert('Erro, tente novamente mais tarde')
      );
    this._http.listaHomologados().subscribe(Response => this.CasosHomolagados = Response, erro => alert('Erro, tente novamente mais tarde'));
    this._http.listaAgendados().subscribe(Response => this.CasosAgendados = Response, erro => alert('Erro, tente novamente mais tarde'));
    this.resep();
  }
  formatDate(date: string){
   
    let day;
    let month;
    let year;
    let dateBR;
    if(date.length != 10){
          year = date.slice(0,-15)
          day =  date.slice(8,-9)
          month = date.slice(5,-12)

    let DATE : Date = new Date(year, month -1, day  )

    month = DATE.toLocaleString('default', {month: 'long'})
     
     dateBR  =   day + ' ' + month  + ' ' +year
    }else{
          year = date.slice(0,-6)
          day =  date.slice(8,)
          month = date.slice(5,-3)

    let DATE : Date = new Date(year, month -1, day  )

    month = DATE.toLocaleString('default', {month: 'long'})
     
     dateBR  =   day + ' ' + month  + ' ' +year
    }
    return dateBR;

  }



  aplicaCssErro(campo) {

    return {
      'is-invalid': this.verificarValidTouched(campo)
    };
  }
  verificarValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }

  // validacao do reenvio
  aplicaCssErroReenvio(campo) {

    return {
      'is-invalid': this.verificarValidTouchedReenvio(campo)
    };
  }
  verificarValidTouchedReenvio(campo) {
    return !this.formularioRenvio.get(campo).valid && this.formularioRenvio.get(campo).touched;
  }

  PopulaForms(caso: CasoClinico) {


   
    this.NU_REJEICOES = caso.NU_REJEICOES;
  //  console.log(this.NU_REJEICOES)
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
      CO_SUBCATEGORIA: caso.CO_SUBCATEGORIA,
    });
    
    this.auxilixacategorias = this.atributos.Chaves[caso.CO_CATEGORIA]
    this.textCategoria = this.atributos.Categorias[caso.CO_CATEGORIA]
    this.textSubcategoria = this.atributoSUb[this.auxilixacategorias]

    this.SubCategorias();
  }
  resep() {
    this.image = '';
    this.ArrayImagens = [];
     this.contDelete = 0;
     this.textCategoria = '';
     this.textSubcategoria = '';
    this.imagensDeletadas = [];
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
      this._http.deletarImagens(this.imagensDeletadas,this.formulario.get('CO_SEQ_CASO_CLINICO').value).subscribe(resp => console.log(resp))
      const formData = new FormData();
      formData.append('DS_HISTORIA_CLINICA', this.formulario.get('DS_HISTORIA_CLINICA').value);
      formData.append('DS_DISCUSSAO',this.formulario.get('DS_DISCUSSAO').value);
      formData.append('DS_REFERENCIAS',this.formulario.get('DS_REFERENCIAS').value);
      formData.append('DS_DIAGNOSTICO',this.formulario.get('DS_DIAGNOSTICO').value);
      formData.append('CO_CATEGORIA',this.formulario.get('CO_CATEGORIA').value);
      formData.append('DS_ACHADOS_DAS_IMAGENS',this.formulario.get('DS_ACHADOS_DAS_IMAGENS').value);
      formData.append('CO_SEQ_CASO_CLINICO',this.formulario.get('CO_SEQ_CASO_CLINICO').value);
      formData.append('CO_SUBCATEGORIA',this.formulario.get('CO_SUBCATEGORIA').value);

      this._http.homologar(formData).subscribe (resp =>alert('Envidao com sucesso'), error =>alert('erro ao enviar') );

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
   // console.log(this.formulario.get('DT_SEMANA').value);
    if (this.formulario.get('DT_SEMANA').value) {

      var aux = null;
      aux = this.formulario.get('DT_SEMANA').value.year + '-' + this.formulario.get('DT_SEMANA').value.month + '-' + this.formulario.get('DT_SEMANA').value.day;
      this.formulario.patchValue({
        DT_SEMANA: aux
      });
    //  console.log(this.formulario.get('DT_SEMANA').value);
      if (this.formulario.get('CO_SEQ_CASO_CLINICO').value) {

       // console.log(this.formulario.get('DT_SEMANA').value, this.formulario.get('CO_SEQ_CASO_CLINICO').value)
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
  // pegando as imagens dos casos direto do response do servidor
  populaIMG(imagens){
    this.ArrayImagens = imagens;
    //console.log('ArrayImagens',this.ArrayImagens)
  }

  verColaborador(content,id) {
    //console.log(id)
    this.modalService.open(content, { centered: true });
    this.formularioRenvio.patchValue({
      CO_SEQ_CASO_CLINICO: id
    }); 
    //console.log(this.CasosPendentes);
   }
  Reenviar(){
   // console.log(this.formularioRenvio.value);

    if (this.formularioRenvio.valid ) {
      const formDataReenvio = new FormData();
      formDataReenvio.append('CO_SEQ_CASO_CLINICO', this.formularioRenvio.get('CO_SEQ_CASO_CLINICO').value);
      formDataReenvio.append('DS_CORRECOES',this.formularioRenvio.get('DS_CORRECOES').value);
      this._http.reenvioCase(formDataReenvio).subscribe (resp => alert('Formulario enviado com sucesso'), erro => alert('Erro, tente novamente mais tarde'));
        this.ngOnInit ();
      alert('Formulario enviado com sucesso')
      var element = document.getElementById('closee')
      element.click()
     
    } else {
      alert("Formulario invalido")
      this.verificarValidacoeFrom(this.formularioRenvio);
    }


  }
  DeletarCaso(id){
    let conf = false;
    conf = confirm('deseja deletar esse Caso?');

    if(conf){
      this._http.deletarCaso(id).subscribe( Responser => alert( 'Deletado com sucesso'),
      err => alert('falha ao deletar'));
    }
    this.ngOnInit();
  }
  ModalImg(imagems,i,index) {

    this.MaxImg = this.ArrayImagens.length - 1;
    this.ArrayImagens
    this.cont = i;
    this.imagem = imagems; 
    this.letra = index;
   
  }
  deletarImagem(imagens){
    //console.log('imagem', imagens)
    let conf;
      conf = confirm('desaje deletar essa imagens?');
      if(conf){
        this.ArrayImagens.splice(this.cont, 1)
        this.imagensDeletadas[this.contDelete] = imagens.slice(15,-4)
        this.contDelete = this.contDelete +1;
      }
      //console.log(this.imagensDeletadas)
      var element = document.getElementById('close')
      element.click()
  }
  MiniCard(x) {
    this.image = this.hostApi + x;
  }

}
