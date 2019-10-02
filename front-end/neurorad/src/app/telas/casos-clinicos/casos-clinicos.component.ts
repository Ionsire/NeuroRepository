import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { CasoClinico } from 'src/app/services/Classes/caso';
import { SubCategorias } from 'src/app/services/Classes/subcategorias';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/services/Classes/Categorias';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-casos-clinicos',
  templateUrl: './casos-clinicos.component.html',
  styleUrls: ['./casos-clinicos.component.less']
})
export class CasosClinicosComponent implements OnInit {

  CasosClinicos$: Observable<CasoClinico[]>;
  casosclinicos : CasoClinico[];
  erro$ = new Subject<boolean>();
  pag: number = 1;
  Resuldado: number = 0;
  Categorias: Categorias = new Categorias();
  formulario: FormGroup;
  SubCategoria: SubCategorias = new SubCategorias();
  Sub_aux: string;
  auxiliar: string[] = [];

  hostApi: string = "http://localhost:8000/storage/images/";
  ext: string = ".png";

  constructor(private formBuilder: FormBuilder, private _http: CasesService, private router: Router) { }

  ngOnInit() {
    this.Atualizar();
    this.formulario = this.formBuilder.group({
      CO_CATEGORIA: [null],
      CO_SUBCATEGORIA: [null],
    });
  }
  Atualizar() {

    // this._http.getCase().subscribe(
    //   responser => console.log(responser),
      
    // )
    this.CasosClinicos$ = this._http.getCase()
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

    if (this.formulario.get('CO_CATEGORIA').value) {
       let aux;
      aux = this.formulario.get('CO_CATEGORIA').value;
      this.Sub_aux = this.Categorias.categorias[aux-1].chave;
      this.auxiliar = this.SubCategoria[this.Sub_aux];
    } else {
      this.auxiliar = [];


    }
  }

}
