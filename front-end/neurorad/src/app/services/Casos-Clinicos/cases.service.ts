import { environment } from './../../../environments/environment';

import { CasoClinico } from 'src/app/services/Classes/caso';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { take, delay } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CasesService {

  // aqui esta recebendo todos os casos clinicos
  private APINeuro = `${environment.API}casoclinico`;
  //private APINeuro = `${environment.API}vercaso";
  private APINeuroViewCase = `${environment.API}vercaso`;

  private APINeuroCasoAdm = `${environment.API}auth/casesAdmin`;

  private APICasoSemana = `${environment.API}casos_da_semana_home`;


  private APINeuroHomo = `${environment.API}list_homologar`;
  private APIHomologar = `${environment.API}homologar`;

  private APIHomologados = `${environment.API}lista_homologados`;
  private APIAgendados = `${environment.API}lista_agendados`;

  private APIAgendar = `${environment.API}agendamento`;
  private APIDesagendar = `${environment.API}desagendamento`;

  private APIDisponibilizar = `${environment.API}disponibilizar`;
  private APIReenvio = `${environment.API}reenviar`;
  private APIdeletarCaso = `${environment.API}deletar`;
  private APImeusCasos = `${environment.API}meuscasos`;  
  private APIautorCasos = `${environment.API}user_nome`;

  private APIdeletarImages = `${environment.API}deletar`;

  private APIReenviarCasoUser = `${environment.API}reenviar`;
  private APICreatCaso = `${environment.API}casoclinico`

  private Token;


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
      delay(350),
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

    return this.http.get<CasoClinico>(`${this.APINeuroViewCase}/${id}`).pipe(take((1)));

  }
  casoAdm(id) {
    this.Token = localStorage.getItem('token');

    let params = new HttpParams();

    params = params.append('token', this.Token);

    return this.http.get<any>(`${this.APINeuroCasoAdm}/${id}`,{ params: params }).pipe(take((1)));

  }
  reenvioCase(caso){

    return this.http.post(this.APIReenvio,caso);
  }
  deletarCaso(id){

    return this.http.get(`${this.APIdeletarCaso}/${id}`).pipe(take((1)));
  }
  meusCasos(id){

    return this.http.get<CasoClinico[]>(`${this.APImeusCasos}/${id}`).pipe(take((1)));;
  }
  autorCaso(id){ 
    return this.http.get(`${this.APIautorCasos}/${id}`);

  }
  deletarImagens( imagns:any[], id){

    let params = new HttpParams();

      for (let index = 0; index < imagns.length; index++) {
        params = params.append('IM_IMAGE[]',imagns[index] );
      }
      params= params.append('CO_CASO_CLINICO',id);
     
      return this.http.get(`${this.APIdeletarImages}`,{ params: params }) // APIdeletarImages
  }
  reenviarCasoUser(id: number , formdate: any){

    return this.http.post(`${this.APIReenviarCasoUser}/${id}`,formdate);
  }
  creatCaso(formdate: any){
    return this.http.post(this.APICreatCaso,formdate);
  }


}
