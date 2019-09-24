import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { Usuario } from '../usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private API = "http://localhost:3000/Usuarios";

  constructor(private http: HttpClient) { }

  POST(Form){
    return this.http.post(`${this.API}/`,Form).pipe(take(1));
  }
  GET() {
    return this.http.get<Usuario[]>(this.API);
  }
  delete(id){
    return this.http.delete(`${this.API}/${id}`)
  }
  update(usuario){
    return this.http.put(`${this.API}/${usuario.id}`,usuario).pipe(take((1)));
  }

}
