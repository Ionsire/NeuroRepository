import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Usuario } from 'src/app/services/Classes/usuario';
import { Observable, Subject, empty } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { AtributosUser } from 'src/app/services/Classes/atributos';

@Component({
  selector: 'app-colaboradores',
  templateUrl: './colaboradores.component.html',
  styleUrls: ['./colaboradores.component.less'],
  encapsulation: ViewEncapsulation.None,
})
export class ColaboradoresComponent implements OnInit {
  formulario: FormGroup;
  closeResult: string;
  VerColaborador: Usuario = new Usuario();

  atributos : AtributosUser = new AtributosUser();
  
  
  especializacoes: string[] = [];

  Colaboradores$: Observable<Usuario[]>;
  erro$ = new Subject<boolean>();

  constructor(private modalService: NgbModal, private _http: UsuarioService) { }

  ngOnInit() {
    this.formulario = new FormGroup({
      search: new FormControl(''),
    });


  this. Atualizar()
  }


  Atualizar() {
    this.Colaboradores$ = this._http.Colaboradores()
      .pipe(
        catchError(error => {
          console.log(error);
          this.erro$.next(true);
          return empty();
        })
      );
      
  }
  verColaborador(content,  colaborador: Usuario ) {
    this.modalService.open(content, { centered: true });
    this.VerColaborador = colaborador;
  }

}
