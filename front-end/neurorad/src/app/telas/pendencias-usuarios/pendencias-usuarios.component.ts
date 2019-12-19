import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/services/Classes/usuario';
import { AtributosUser } from 'src/app/services/Classes/atributos';


@Component({
  selector: 'app-pendencias-usuarios',
  templateUrl: './pendencias-usuarios.component.html',
  styleUrls: ['./pendencias-usuarios.component.less']
})
export class PendenciasUsuariosComponent implements OnInit {

  UsuariosPendentes: Usuario[];
  formulario: FormGroup;
  Usuario$: Usuario = new Usuario();
  condicoes : boolean;
  atributos : AtributosUser = new AtributosUser();

  constructor( private formBuilder: FormBuilder, private _http: UsuarioService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      CO_SEQ_USUARIO:[null, Validators.required],
      CO_PAPEL: [null, Validators.required],
    });
      this._http.GET().subscribe(
        response => this.UsuariosPendentes = response,
        erro =>alert("Ocorreu um erro ao iniciar")//console.log(erro)
      )
  }
  onSubmit(){
   // console.log(this.formulario.value);
    
     if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('CO_PAPEL', this.formulario.get('CO_PAPEL').value);
      formData.append('CO_SEQ_USUARIO', this.formulario.get('CO_SEQ_USUARIO').value);
      this._http.update(formData).subscribe(
        success =>this.SucessoAlerta(),
        error => this. ErroApi(),
      );
     } else {
       this.Erro();
     }
     this.ngOnInit();
  }
  aplicaCssErro(campo) {

    return {
      'is-invalid': this.verificarValidTouched(campo)
    };
  }
  verificarValidTouched(campo) {
    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  verificarValidacoeFrom(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      //console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup ) {
        this.verificarValidacoeFrom(controle);
      }

    });

  }
  PopulaForms(usuario: Usuario) {//console.log(usuario)
   this.Reset();
   this.Usuario$ = usuario;
   this.formulario.patchValue({
    CO_SEQ_USUARIO: usuario.CO_SEQ_USUARIO,
  });

  }
  Reset() {
    this.formulario.patchValue({
      CO_SEQ_USUARIO: [null, Validators.required],
      CO_PAPEL: [null, Validators.required],
    });
    this.Usuario$ = new Usuario();
  }
  recusar(id) {
   // console.log(id)
    if(id){
this.condicoes =  confirm(
      'Deseja recusar esse Usuário'
    );
    if (this.condicoes) {
    this.Reset()
     this._http.delete(id).
     subscribe(
       success =>this.ngOnInit()
     );
    } else {

    }
    }else{
      alert('Usuario não selecionado');
    }
    
  }
  SucessoAlerta() {
    alert(' Enviado com Sucesso');
  }
  Erro(){
    alert('Formualrio com erro ou Formulario Invalido!')
    this.verificarValidacoeFrom(this.formulario);
  }
  ErroApi(){
    alert('Erro ao tentar enviar!')
  }
  formatDate(date: string){

    if(date !=null){
        let day;
        let month;
        let year;
        let dateBR;
            year = date.slice(0,-6)
            day =  date.slice(8,)
            month = date.slice(5,-3)

        let DATE : Date = new Date(year, month -1, day  )

        month = DATE.toLocaleString('default', {month: 'long'})

        dateBR  =   day + ' ' + month  + ' ' +year
        return dateBR;
  }
  }
  
}
