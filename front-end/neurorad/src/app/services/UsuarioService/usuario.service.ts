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
  private APIUserPendentes = "http://localhost:8000/api/pendencias_usuarios"

  constructor(private http: HttpClient) { }

  solicitarAcesso(Form){
    return this.http.post(`${this.APIAcessoEspecial}`,Form)
  }
  GET() {
    return this.http.get<Usuario[]>(this.APIUserPendentes);
  }
  delete(id){
    return this.http.delete(`${this.API}/${id}`)
  }
  update(usuario){
    return this.http.put(`${this.API}/${usuario.id}`, usuario).pipe(take((1)));
  }

}
