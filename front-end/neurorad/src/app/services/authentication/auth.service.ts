import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../Classes/usuario';
//import { EventEmitter } from 'events'; // ja importado
import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  title: any

  private APILogin = "http://localhost:8000/sabia/callback";
  private APIloginUser = "http://localhost:8000/api/auth/user";
  private APILogout = "http://localhost:8000/api/auth/logout";
  private Usuario: Usuario;

  acesso : boolean = false

  AcessoRegistrar: boolean = false;
  // homologacao, lista de user, gerenciauser 
  GerenciaADM: boolean = false;


  private Token : string;
   
  static  CriarToken = new EventEmitter();
  private static emitters: {[nomeEvento: string]: EventEmitter<any>} = {}


  constructor( private http: HttpClient ) { }

  // Metodo que faz a parada do EventEmiter
  static get (nomeEvento:string): EventEmitter<any> {
    if (!this.emitters[nomeEvento])
        this.emitters[nomeEvento] = new EventEmitter<any>();
    return this.emitters[nomeEvento];
  }
 
  Login(){
    return this.acesso;
  }

  Loginn(code) {
    let params = new HttpParams();

    params = params.append('code', code);

    this.http.get(`${this.APILogin}`,{ params: params }).subscribe(Response => this.acessotoken(Response) )
  }

  //intercepitando o token
  acessotoken(token){
 
    this.Token = token 
    localStorage.setItem('token', this.Token);
   // AuthService.CriarToken.emit(token)
    let params = new HttpParams();
    params = params.append('token', token);

    this.http.get(`${this.APIloginUser}`,{ params: params }).subscribe(resp => this.GetdadosUser(resp))
    console.log(this.Token);

  }

  GetdadosUser(user){
    console.log('cheguei');
    // estou dando o Emit para todos que estao inscritos no evento testando
    AuthService.get('enviaUser').emit(user)
    //console.log(user)
    this.Usuario = user
    if (this.Usuario) {
      this.acesso = true
      this.AtivarLogado();
      if(this.Usuario.CO_PAPEL !='6'){
        this.AcessoRegistrar = true;
        this.RegistrarSwitch();
        if (this.Usuario.CO_PAPEL == '1'){
          this.GerenciaADM =true;
          this.PreceptorAdministrador();
        }
      }
    }
    console.log();
  }

  Logoff() {
    localStorage.removeItem('token');
    this.acesso = false;
    this.AtivarLogado();

    let params = new HttpParams();

    params = params.append('token', this.Token);

    this.http.get(`${this.APILogout}`,{ params: params }).subscribe(resp => console.log(resp))
    this.Token = null;
  }
  
  User(){
    return this.Usuario
  }
  AtivarLogado(){
    return this.acesso;
  }
  RegistrarSwitch(){
    return this.AcessoRegistrar
  }
  PreceptorAdministrador(){
     return this.GerenciaADM
  }
  
}

 
 


