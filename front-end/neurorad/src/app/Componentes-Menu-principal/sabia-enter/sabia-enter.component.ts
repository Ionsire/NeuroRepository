import { AuthService } from './../../services/authentication/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sabia-enter',
  templateUrl: './sabia-enter.component.html',
  styleUrls: ['./sabia-enter.component.less']
})
export class SabiaEnterComponent implements OnInit {

  const : string = "https://login.sabia.ufrn.br/oauth/authorize/?client_id=FLZ4MGe3BtQcDx0ddp06P1gPQtJZRbeF8r4bxs3w&redirect_uri=http://localhost:4200/home/&response_type=code";

  constructor( private _enter: AuthService) { }

  ngOnInit() {
  }

  login() { 
    this._enter.Login();
  }

}
