import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Usuario } from '../Classes/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API = "http://localhost:3000/Usuarios";
  private APIAcessoEspecial = "http://localhost:8000/api/acesso_especial";
  private APIUserPendentes = "http://localhost:8000/api/pendencias_usuarios";
  private APIHomologarUsuario = "http://localhost:8000/api/homologar_usuario";
  private APIRecusar = "http://localhost:8000/api/recusar_usuario"
  private APIListaUsuarios = "http://localhost:8000/api/lista_usuarios"


  constructor(private http: HttpClient) { }

  solicitarAcesso(Form){
    // usuario solicitando acesso no neurorad
    return this.http.post(`${this.APIAcessoEspecial}`,Form)
  }
  GET() {
    // buscando os usuarios pendentes 
    return this.http.get<Usuario[]>(this.APIUserPendentes);
  }
  delete(id) {
    // recursar a  solicitacao
    return this.http.get(`${this.APIRecusar}/${id}`)
  }
  update(usuario){
    return this.http.post(`${this.APIHomologarUsuario}`, usuario);
  }
  Colaboradores() {
    // lista os colaboradores do neurorad
    return this.http.get<Usuario[]>(this.APIListaUsuarios);
  }

}
