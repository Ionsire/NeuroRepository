import { CasoClinico } from 'src/app/services/Classes/caso';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  private API = "http://localhost:3000/CasosClinicos/";
  private API2 = "http://localhost:3000/CasoSemana/";

  // aqui esta recebendo todos os casos clinicos
  private APINeuro = "http://localhost:8000/api/casoclinico";

  private APICasoSemana = "http://localhost:8000/api/casos_da_semana_home";


  private APINeuroHomo = "http://localhost:8000/api/list_homologar";
  private APIHomologar = "http://localhost:8000/api/homologar";

  private APIHomologados = "http://localhost:8000/api/lista_homologados";
  private APIAgendados = "http://localhost:8000/api/lista_agendados";

  private APIAgendar = "http://localhost:8000/api/agendamento";
  private APIDesagendar = "http://localhost:8000/api/desagendamento";

  private APIDisponibilizar = "http://localhost:8000/api/disponibilizar";


      // params = params.append('busca[CO_CATEGORIA]', busca['CO_CATEGORIA']);
      // params = params.append('busca[CO_SUBCATEGORIA]', busca['CO_SUBCATEGORIA']);

  constructor(private http: HttpClient) { }

  getCase(busca): Observable<any>  {
    let params = new HttpParams();
      // Setup log namespace query parameter

      if(busca['DS_DIAGNOSTICO'] != null &&  busca['CO_CATEGORIA'] != null && busca['CO_SUBCATEGORIA'] != null && busca['CO_SUBCATEGORIA']  !=0 && busca['CO_CATEGORIA'] != 0 ){

        params = params.append('busca[DS_DIAGNOSTICO]', busca['DS_DIAGNOSTICO']);
        params = params.append('busca[CO_CATEGORIA]', busca['CO_CATEGORIA']);
        params = params.append('busca[CO_SUBCATEGORIA]', busca['CO_SUBCATEGORIA']);

      }else if(busca['DS_DIAGNOSTICO'] != null &&  busca['CO_CATEGORIA'] != null  &&  busca['CO_CATEGORIA'] != 0 ){

        params = params.append('busca[DS_DIAGNOSTICO]', busca['DS_DIAGNOSTICO']);
        params = params.append('busca[CO_CATEGORIA]', busca['CO_CATEGORIA']);

      
      }else if(busca['DS_DIAGNOSTICO'] != null){

        params = params.append('busca[DS_DIAGNOSTICO]', busca['DS_DIAGNOSTICO']);

      }else if(busca['CO_CATEGORIA'] != null && busca['CO_SUBCATEGORIA'] != null &&  busca['CO_SUBCATEGORIA']  !=0 && busca['CO_CATEGORIA'] != 0){

        params = params.append('busca[CO_CATEGORIA]', busca['CO_CATEGORIA']);
        params = params.append('busca[CO_SUBCATEGORIA]', busca['CO_SUBCATEGORIA']);
      }else if(busca['CO_CATEGORIA'] != null && busca['CO_CATEGORIA'] != 0 ){

        params = params.append('busca[CO_CATEGORIA]', busca['CO_CATEGORIA']);

      }else {
        params = new HttpParams();
      }
      
     
    return this.http.get<CasoClinico[]>(`${this.APINeuro}`,{ params: params })
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
    return this.http.get<CasoClinico[]>(this.APICasoSemana);
  }
  loadByID(id) {

    return this.http.get<CasoClinico>(`${this.APINeuro}/${id}`).pipe(take((1)));

  }
}
