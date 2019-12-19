import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-neuro',
  templateUrl: './footer-neuro.component.html',
  styleUrls: ['./footer-neuro.component.less']
})
export class FooterNeuroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  LAIS(){
    window.open('https://lais.huol.ufrn.br/','_blank')
  }
  UFRN(){
    window.open('https://www.ufrn.br/','_blank')
  }
  HUOL(){
    window.open('http://www2.ebserh.gov.br/web/huol-ufrn','_blank') 
  }

}
