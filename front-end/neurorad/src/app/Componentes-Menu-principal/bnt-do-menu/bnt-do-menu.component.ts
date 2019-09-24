import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bnt-do-menu',
  templateUrl: './bnt-do-menu.component.html',
  styleUrls: ['./bnt-do-menu.component.less']
})
export class BntDoMenuComponent implements OnInit {

  constructor() { }
  lu:string= 'active';

  M: string = "Menu";

  ngOnInit() {
  }
  

  active() {
    if ( this.lu === 'active') {
      this.lu = 'a';
    } else {
      this.lu = 'active';
    }
  }
  activeHome() {
    if ( this.M !== 'Home') {
      this.M = 'Home';
      this.lu = 'active';
  }
}
  activeCS() {
    if ( this.M !== 'Casos Clinicos') {
      this.M =  'Casos Clinicos';
      this.lu = 'active';
  }
}
  activeRe() {
    if ( this.M !== 'Registrar') {
      this.M = 'Registrar';
      this.lu = 'active';
  }

 }


}
