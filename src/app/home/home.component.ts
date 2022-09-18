import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import jwt_decode from "jwt-decode";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  token:any;
  userData:any;
  email:any;
  constructor(private router:Router) { }

  ngOnInit(): void {
    this.token=localStorage.getItem('token');
    this.userData=jwt_decode(this.token);
    this.email=this.userData.email;
    console.log(this.token);
    console.log(this.userData);
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/logout']);
    window.location.reload();
  }
}

