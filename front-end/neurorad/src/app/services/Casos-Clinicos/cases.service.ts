import { CasoClinico } from 'src/app/services/Classes/caso';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { take, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  private API = "http://localhost:3000/CasosClinicos/";
  private API2 = "http://localhost:3000/CasoSemana/";
  private APINeuro = "http://localhost:8000/api/casoclinico";
  private APINeuroHomo = "http://localhost:8000/api/list_homologar";
  private APIHomologar = "http://localhost:8000/api/homologar";

  private APIHomologados = "http://localhost:8000/api/lista_homologados";
  private APIAgendados = "http://localhost:8000/api/lista_agendados";

  private APIAgendar = "http://localhost:8000/api/agendamento";
  private APIDesagendar = "http://localhost:8000/api/desagendamento";

  private APIDisponibilizar = "http://localhost:8000/api/disponibilizar";





  constructor(private http: HttpClient) { }

  getCase() {
    return this.http.get<CasoClinico[]>(this.APINeuro)
    .pipe(
      delay(1000),
    );
  }

  getCaseHomo() {
    // this.APINeuroHomo
    return this.http.get<CasoClinico[]>(this.APINeuroHomo)
  }


  homologar(caso) {
    
    return this.http.post(this.APIHomologar,caso); // Refazer enviando o formulario completo
  }

  listaHomologados(){
    
    return this.http.get<CasoClinico[]>(this.APIHomologados);
  }


  agendarCaso(id, date){
    return this.http.get(`${this.APIAgendar}/${id}/${date}`);
  }

  desagendarCaso(id){
    return this.http.get(`${this.APIDesagendar}/${id}`);
  }

  tornarCasoPublico(id){
    return this.http.get(`${this.APIDisponibilizar}/${id}`);
  }

  listaAgendados(){
    
    return this.http.get<CasoClinico[]>(this.APIAgendados);
  }

  getCaseSemana() {
    return this.http.get<CasoClinico[]>(this.APINeuro);
  }
  loadByID(id) {

    return this.http.get<CasoClinico>(`${this.APINeuro}/${id}`).pipe(take((1)));

  }
}
