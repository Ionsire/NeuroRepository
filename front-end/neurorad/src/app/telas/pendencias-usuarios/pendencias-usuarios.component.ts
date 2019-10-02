import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Usuario } from 'src/app/services/Classes/usuario';


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

  constructor( private formBuilder: FormBuilder, private _http: UsuarioService) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      id:[],
      Nome: [null, [Validators.required, Validators.maxLength(50)]],
      Email: [null, [Validators.required, Validators.email]],
      Data_Nascimento: [null, Validators.required],
      Perfil: [null, Validators.required],
      Especialidade: [null, Validators.required],
      Papel: [null, Validators.required],
    });
      this._http.GET().subscribe(
        response => this.UsuariosPendentes = response,
        erro =>console.log(erro)
      )
  }
  onSubmit(){
    if (this.formulario.valid) {
      this._http.update(this.formulario.value).subscribe(
        success =>this.SucessoAlerta(),
        error => this.Erro(),
      );
    } else {
      this.Erro();
    }
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
      console.log(campo);
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup ) {
        this.verificarValidacoeFrom(controle);
      }

    });

  }
  PopulaForms(usuario: Usuario) {
    this.Reset();
    this.formulario.patchValue({
      id : usuario.id,
      Nome: usuario.Nome,
      Email: usuario.Email,
      Data_Nascimento: usuario.Data_Nascimento,
      Perfil: usuario.Perfil,
      Especialidade: usuario.Especialidade,
    });
   this.Usuario$ = usuario;
  }
  Reset() {
    this.formulario.patchValue({
      Nome: null,
      Email: null,
      Data_Nascimento: null,
      Perfil: null,
      Especialidade: null,
      Papel: [null, Validators.required],
    });
    this.Usuario$ = new Usuario();
  }
  recusar(id){
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
  }
  SucessoAlerta() {
    alert(' Enviado com Sucesso');
  }
  Erro(){
    alert('Formualrio com erro ou Formulario Invalido!')
    this.verificarValidacoeFrom(this.formulario);
  }
}
