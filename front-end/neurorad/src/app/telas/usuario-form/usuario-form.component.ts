import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/UsuarioService/usuario.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrls: ['./usuario-form.component.less']
})
export class UsuarioFormComponent implements OnInit {
  formulario: FormGroup;
  constructor(  private formBuilder: FormBuilder, private service: UsuarioService, private location: Location) { }

  ngOnInit() {
    this.formulario = this.formBuilder.group({
      Nome: [null, [Validators.required, Validators.maxLength(50)]],
      Email: [null, [Validators.required, Validators.email]],
      Data_Nascimento: [null, Validators.required],
      Perfil: [null, Validators.required],
      Especialidade: [null, Validators.required],
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      this.service.POST(this.formulario.value).subscribe(
        success =>this.SucessoAlerta(),
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
      console.log(campo);
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
  Erro(){
    alert('Formualrio com erro ou Formulario Invalido!')
    this.verificarValidacoeFrom(this.formulario);
  }

}
