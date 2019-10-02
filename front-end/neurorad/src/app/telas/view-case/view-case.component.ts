import {CasoClinico } from 'src/app/services/Classes/caso';
import { CasesService } from './../../services/Casos-Clinicos/cases.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-view-case',
  templateUrl: './view-case.component.html',
  styleUrls: ['./view-case.component.less']
})
export class ViewCaseComponent implements OnInit {

  CasoClinico: CasoClinico = new CasoClinico();
  Img: string[];
  imagem: string;

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
  get(x){
    this.CasoClinico = x;
    this.Img = x.images[0];
  }
  ModalImg(imagems) {
    this.imagem = imagems;
  }
  Voltar() {
    this.location.back();
  }

}
