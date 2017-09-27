import { Injectable } from '@angular/core';
import {Router,ActivatedRouteSnapshot,RouterStateSnapshot,CanActivate} from '@angular/router';

@Injectable()
export class AuthService implements CanActivate {
  constructor() { }
  canActivate(next:ActivatedRouteSnapshot, state:RouterStateSnapshot){
    if(this.getIdentity()){
      console.log("paso el guard");
      return true;
    }else{
      console.error("bloqueado por el guard");
      return false;
    }
  }

  getIdentity():boolean{
    let identity=JSON.parse(localStorage.getItem('identity'));
    console.log(identity);
    if(identity !=null){
      return true;
    }else{
      return false;
    }
  }

}
