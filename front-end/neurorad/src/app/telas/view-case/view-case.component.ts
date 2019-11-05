import {CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ViewCategorias } from 'src/app/services/Classes/viewcategorias';
import { ViewSubCategorias } from 'src/app/services/Classes/viewsubcategoria';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.less']
})
export class ViewCaseComponent implements OnInit {

  CasoClinico: any = '';
  MaxImg: number;
  cont : number = 0;
  Img: string[];
  imagem: string;
  auxilixacategorias : any = '';
  Letras: string[] = [ 'A' , 'B' , 'C' , 'D' , 'E' , 'F' , 'G' , 'H' , 'I' , 'J' , 'K' , 'L' , 'M' , 'N' , 'O' , 'P' , 'Q' , 'R' , 'S' , 'T' , 'U' , 'V' , 'W' , 'X' , 'Y']

  atributos: ViewCategorias = new ViewCategorias();
  atributoSUb: ViewSubCategorias =  new ViewSubCategorias();

  hostApi: string = "http://localhost:8000/";
  ext: string = ".png";

  constructor( private route: ActivatedRoute,private location: Location, private _http: CasesService, ) { }

  ngOnInit() {
      this.route.params
             .pipe(
              map((params: any) => params[ 'id' ]),
               switchMap( id => this._http.loadByID(id))
             )
             .subscribe(response => this.get(response));
             }





             
  get(caso){
    this.CasoClinico = caso;
    this.auxilixacategorias = this.atributos.Chaves[caso.CO_CATEGORIA]
    this.CasoClinico.CO_CATEGORIA = this.atributos.Categorias[caso.CO_CATEGORIA]
    this.CasoClinico.CO_SUBCATEGORIA = this.atributoSUb[this.auxilixacategorias][caso.CO_SUBCATEGORIA]

    this.Img = caso.images[0];
  }
  ModalImg(imagems,i) {
    this.cont = i;
    this.imagem = imagems;
    this.MaxImg = this.CasoClinico.images.length - 1;
    
   
  }
  Voltar() {
    this.location.back();
  }

}
