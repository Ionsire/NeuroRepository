import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';
import { AuthService } from 'src/app/services/authentication/auth.service';
import { Usuario } from 'src/app/services/Classes/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usuario-logado',
  templateUrl: './usuario-logado.component.html',
  styleUrls: ['./usuario-logado.component.less']
})
export class UsuarioLogadoComponent implements OnInit {

  usuario: Usuario
  UsuariosPendentes: number = 0;
  CasosPendentes: number = 0;
  contNotificacoes : any;
  userData: any;

  constructor( private _http: UsuarioService , private _http1: CasesService, private Service: AuthService, private router: Router) { }

  ngOnInit() {
    this._http.GET().subscribe(
      response => this.UsuariosPendentes = response.length,
      erro => alert('Erro, tente novamente mais tarde')
    );
    this._http1.getCaseHomo()
    .subscribe(Response => this.CasosPendentes = Response.length,
      erro => alert('Erro, tente novamente mais tarde')
    );
      
    // AuthService.get('enviaUser').subscribe(data => {
    //     this.userData = data;
    //     console.log('dados do comp', this.userData);
    //     //this.logado = true;
    // });
    //console.log('eu executei');
    this.usuario = this.Service.User()
  }
  Logout(){
    let conf;
    this.Service.Logoff();
     conf = confirm('Deseja sair do sabiá também?');
     if (conf) {
      window.open('https://login.sabia.ufrn.br/sair/','_blank')
     }
     this.router.navigate(['home'])
  
  }
}
