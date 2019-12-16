import { Injectable } from '@angular/core';
import { OnInit } from '@angular/core';
import { environment } from './../../../environments/environment';


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
  private APIloginUser = `${environment.API}auth/user`;
  private APILogout = `${environment.API}auth/logout`;
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

    // usando o Try para caso o Token seja invalido ou expirado
    
      this.http.get(`${this.APIloginUser}`,{ params: params }).subscribe(resp => this.GetdadosUser(resp), erro => {this.Logoff(), alert("Token Invalido")});
  }
  GetdadosUser(user){

     // codigo para renovar o token
        //var intervalo = window.setInterval(lerolero, 30000);
           //function lerolero() {
              // window.alert("Token esta quase expirando deseja renovar?");
          // }


    // estou dando o Emit para todos que estao inscritos no evento testando
    AuthService.get('enviaUser').emit(user)
    localStorage.setItem('CO_PAPEL', user.CO_PAPEL );
    localStorage.setItem('CO_STATUS', user.CO_STATUS );
    //console.log(user)
    this.Usuario = user
    if (this.Usuario) {
      this.acesso = true
      this.AtivarLogado();
      if(this.Usuario.CO_PAPEL !='6' && this.Usuario.CO_STATUS == 3){
        this.AcessoRegistrar = true;
        this.RegistrarSwitch();
        if (this.Usuario.CO_PAPEL == '1'){
          this.GerenciaADM =true;
          this.PreceptorAdministrador();
        }
      }
    }
  }

  Logoff() {
    localStorage.removeItem('token');
    localStorage.removeItem('CO_STATUS');
    localStorage.removeItem('CO_PAPEL');
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
    if(this.Usuario.CO_STATUS ==2){
      return false
    }else{
      return this.GerenciaADM
    }
  }
  
}

 
 


