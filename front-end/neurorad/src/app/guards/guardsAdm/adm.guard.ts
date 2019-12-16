import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/authentication/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdmGuard implements CanActivate {
  CO_PAPEL : any;
  CO_STATUS:any;


  constructor( private http:AuthService,  private router: Router  ){}

  

  canActivate( route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

      this.http.acessotoken(localStorage.getItem("token"));  
      this.CO_PAPEL = localStorage.getItem("CO_PAPEL");
      this.CO_STATUS = localStorage.getItem("CO_STATUS");
      if( this.CO_STATUS ==3  && this.CO_PAPEL == '1'){
        return true;
      }else{
        this.router.navigate(['home']);
        return false;
      }
  }
  
}
