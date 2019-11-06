import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CasesService } from 'src/app/services/Casos-Clinicos/cases.service';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/authentication/auth.service'; // Event Emiter aki
import { Usuario } from 'src/app/services/Classes/usuario';

@Component({
  selector: 'app-bnt-do-menu',
  templateUrl: './bnt-do-menu.component.html',
  styleUrls: ['./bnt-do-menu.component.less']
})
export class BntDoMenuComponent implements OnInit {

  formularioBusca: FormGroup;
  token;

  constructor(private formBuilder: FormBuilder, private _http: CasesService, private router: Router, private auth: AuthService,private route: ActivatedRoute) { }
  lu:string= 'active';
  M: string = "Menu";

  userData: Usuario =  new Usuario();
  logado: boolean = false;

  ngOnInit() {
    this.formularioBusca = this.formBuilder.group({
      busca:[null]
    });
   // this.token = this.auth.Getuser();
    //this.token = AuthService.CriarToken

   // console.log(this.token)
    if(localStorage.getItem("token")){
     this.auth.acessotoken(localStorage.getItem("token"));
     console.log('token')
    //  this.logado = true;
    }
    // estou escutando o evento testando me inscrevendo
    AuthService.get('enviaUser').subscribe(data => {
        //this.userData = data;
        //console.log('dados chegaram no component', this.userData);
        this.logado = true;
      })


  }
  active() {
    if ( this.lu === 'active') {
      this.lu = 'a';
    } else {
      this.lu = 'active';
    }
  }
  activeHome() {
    if ( this.M !== 'Home') {
      this.M = 'Home';
      this.lu = 'active';
  }
}
  activeCS() {
    if ( this.M !== 'Casos Clinicos') {
      this.M =  'Casos Clinicos';
      this.lu = 'active';
  }
}
  activeRe() {
    if ( this.M !== 'Registrar') {
      this.M = 'Registrar';
      this.lu = 'active';
  }

 }
 onSubmit() {
   this.router.navigate(['casos',this.formularioBusca.get('busca').value])
   this.formularioBusca.patchValue({
    busca: null
   });
 }



}
