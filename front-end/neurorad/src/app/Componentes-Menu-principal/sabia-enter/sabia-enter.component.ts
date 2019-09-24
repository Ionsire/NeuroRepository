import { AuthService } from './../../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sabia-enter',
  templateUrl: './sabia-enter.component.html',
  styleUrls: ['./sabia-enter.component.less']
})
export class SabiaEnterComponent implements OnInit {

  constructor( private _enter: AuthService) { }

  ngOnInit() {
  }

  login() { 
    this._enter.Login();
  }

}
