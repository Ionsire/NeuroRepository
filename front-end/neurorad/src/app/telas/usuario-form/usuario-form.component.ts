import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/services/Classes/usuario';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.less']
})
export class UsuarioFormComponent implements OnInit {
  formulario: FormGroup;
  User : Usuario = new Usuario();
  
  constructor(  private formBuilder: FormBuilder, private service: UsuarioService, private location: Location, private Auth: AuthService) { }
  
  ngOnInit() {
    this.formulario = this.formBuilder.group({
      DS_NOME: [null, Validators.required],
      DS_EMAIL: [null, [Validators.required, Validators.email]],
      DT_NASCIMENTO: [null, Validators.required],
      CO_PERFIL: [null, Validators.required],
      CO_ESPECIALIDADE: [null, Validators.required],
      CO_PAPEL: [null, Validators.required],
      NU_CPF: '700.600.00.00'
    });
    this.User = this.Auth.User();
    this.PopulaForms(this.User) 

  }
  onSubmit() {
    if (this.formulario.valid) {
      const formData = new FormData();
      formData.append('DS_EMAIL', this.formulario.get('DS_EMAIL').value);
      formData.append('DT_NASCIMENTO', this.formulario.get('DT_NASCIMENTO').value);
      formData.append('CO_PERFIL', this.formulario.get('CO_PERFIL').value);
      formData.append('CO_ESPECIALIDADE', this.formulario.get('CO_ESPECIALIDADE').value);
      formData.append('CO_PAPEL', this.formulario.get('CO_PAPEL').value);
      formData.append('CO_SEQ_USUARIO', this.User.CO_SEQ_USUARIO);
      this.service.solicitarAcesso(formData).subscribe(
        success => this.SucessoAlerta(),
        error => this.Erro(),
      );
    } else {
      this.Erro();
    }

  }
  verificarValidTouched(campo) {

    return !this.formulario.get(campo).valid && this.formulario.get(campo).touched;
  }
  aplicaCssErro(campo) {

    return {
      'is-invalid': this.verificarValidTouched(campo)
    };
  }
  verificarValidacoeFrom(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(campo => {
      const controle = formGroup.get(campo);
      controle.markAsTouched();
      if (controle instanceof FormGroup ) {
        this.verificarValidacoeFrom(controle);
      }

    });

  }
  SucessoAlerta() {
    alert(' Enviado com Sucesso');
    this.location.back();
  }
  Erro() {
    alert('Formualrio com erro ou Formulario Invalido!')
    this.verificarValidacoeFrom(this.formulario);
  }
  PopulaForms(User: Usuario) {
    this.formulario.patchValue({
      DS_NOME:User.DS_NOME,
      DS_EMAIL: User.DS_EMAIL,
      CO_PERFIL: User.CO_PERFIL,
      CO_ESPECIALIDADE: User.CO_ESPECIALIDADE,
      CO_PAPEL: User.CO_PAPEL,
      NU_CPF: User.NU_CPF,
  });
  }

}
