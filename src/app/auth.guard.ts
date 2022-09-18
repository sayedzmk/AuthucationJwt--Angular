import { Injectable } from "@angular/core";
import { CanActivate } from '@angular/router';
import { Router } from '@angular/router';

@Injectable({
providedIn:'root'
})

export  class AuthGaurd implements CanActivate {

  constructor(private router:Router){}
  token:any;

  canActivate(){
    this.token=localStorage.getItem('token')
    if(this.token){
      return true
    } else {
      this.router.navigate(['login']);
    }
  }
}


