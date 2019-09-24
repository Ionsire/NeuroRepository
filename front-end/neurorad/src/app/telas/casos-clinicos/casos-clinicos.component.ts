import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { CasoClinico } from 'src/app/services/Casos-Clinicos/caso';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Categorias } from 'src/app/services/Categorias';

@Component({
  selector: 'app-casos-clinicos',
  templateUrl: './casos-clinicos.component.html',
  styleUrls: ['./casos-clinicos.component.less']
})
export class CasosClinicosComponent implements OnInit {

  //CasosClinicos: any[] =[];
  CasosClinicos:CasoClinico[];
  CasosClinicos$: Observable<CasoClinico[]>;
  erro$ = new Subject<boolean>();
  pag: number = 1;
  Categorias : Categorias = new Categorias();

  constructor(private _http: CasesService, private router: Router) { }

  ngOnInit() {
   this.Atualizar();
  }
  Atualizar(){

   this.CasosClinicos$ = this._http.getCase()
   .pipe(
    catchError(error => {
      console.log(error);
      this.erro$.next(true);
      return empty();
      })
    );
  }
  VisualizarCaso(id){
   this.router.navigate(['viewcase',id])
  }

 teste(){
   console.log(this.Categorias.categorias)
 }

}
