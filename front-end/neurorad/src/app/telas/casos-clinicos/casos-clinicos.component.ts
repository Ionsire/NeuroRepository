import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { SubCategorias } from 'src/app/services/Classes/subcategorias';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Categorias } from 'src/app/services/Classes/Categorias';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-casos-clinicos',
  templateUrl: './casos-clinicos.component.html',
  styleUrls: ['./casos-clinicos.component.less']
})
export class CasosClinicosComponent implements OnInit {

  CasosClinicos$: Observable<CasoClinico[]>;
  busca:string[] = [];
  casosclinicos : CasoClinico[];
  erro$ = new Subject<boolean>();
  pag: number = 1;
  Resuldado: number = 0;
  Categorias: Categorias = new Categorias();
  formulario: FormGroup;
  SubCategoria: SubCategorias = new SubCategorias();
  Sub_aux: string;
  auxiliar: string[] = [];
  cont:  number = 1;

  hostApi: string = "http://localhost:8000/storage/images/";
  

  constructor(private formBuilder: FormBuilder, private _http: CasesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      CO_CATEGORIA: [null],
      CO_SUBCATEGORIA: [null],
      DS_DIAGNOSTICO:[null],
    });

    this.route.params.subscribe( parametros =>{
     if (parametros['id']) {
      this.formulario.patchValue({
        DS_DIAGNOSTICO: parametros['id'],
        
      });
     this.busca['DS_DIAGNOSTICO'] = parametros['id'];
     this.Atualizar();
     }else{

      this.Atualizar();
      this.busca['CO_CATEGORIA'] = null;
      this.busca['CO_SUBCATEGORIA'] = null;

     }
    });
  
    
  }


  Atualizar() {

    // this._http.getCase().subscribe(
    //   responser => console.log(responser),
      
    // )
    this.busca['CO_CATEGORIA'] = this.formulario.get('CO_CATEGORIA').value;
    this.busca['CO_SUBCATEGORIA'] = this.formulario.get('CO_SUBCATEGORIA').value;

    this.CasosClinicos$ = this._http.getCase(this.busca)
      .pipe(
        catchError(error => {
          console.log(error);
          this.erro$.next(true);
          return empty();
        })
      );
      ;
      
  }
  VisualizarCaso(id) {
    this.router.navigate(['viewcase', id])
  }
  SubCategorias() {
    this.formulario.patchValue({
      CO_SUBCATEGORIA: [null],
    });
    // this.busca['CO_CATEGORIA'] = this.formulario.get('CO_CATEGORIA').value;
  
    if (this.formulario.get('CO_CATEGORIA').value ) {
       let aux;
      aux = this.formulario.get('CO_CATEGORIA').value;
      this.Sub_aux = this.Categorias.categorias[aux-1].chave;
      this.auxiliar = this.SubCategoria[this.Sub_aux];
    } else {
      this.auxiliar = [];
      this.formulario.patchValue({
        CO_SUBCATEGORIA: [null],
      });
    }
   this.Atualizar()
  }
  SubCategoriasFiltros(){
    // this.busca['CO_SUBCATEGORIA'] = this.formulario.get('CO_SUBCATEGORIA').value;
    this.Atualizar()
  }
  teste() {
    console.log(this.busca)
  }
}


