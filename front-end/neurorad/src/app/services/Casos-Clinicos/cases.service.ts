import { CasoClinico } from 'src/app/services/Casos-Clinicos/caso';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { take, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  private API = "http://localhost:3000/CasosClinicos/";
  private API2 = "http://localhost:3000/CasoSemana/";

  constructor(private http: HttpClient) { }

 
  getCase() {
    return this.http.get<CasoClinico[]>(this.API)
    .pipe(
      delay(1000),
    );
  }
  getCaseSemana() {
    return this.http.get<CasoClinico[]>(this.API2);
  }
  loadByID(id) {

    return this.http.get<CasoClinico>(`${this.API}/${id}`).pipe(take((1)));

  }
}
