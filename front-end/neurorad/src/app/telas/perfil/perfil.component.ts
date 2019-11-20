import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Usuario } from 'src/app/services/Classes/usuario';
import { AtributosUser } from 'src/app/services/Classes/atributos';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.less']
})
export class PerfilComponent implements OnInit {

  userData: Usuario = new Usuario();
  atributos : AtributosUser = new AtributosUser();

  constructor(private service: AuthService) { }

  ngOnInit() {
    if(localStorage.getItem("token")){
      this.service.acessotoken(localStorage.getItem("token"));
     }
     AuthService.get('enviaUser').subscribe(data => this.userData = data)
  
  }

}
