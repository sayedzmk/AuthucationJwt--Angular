import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  data:any;
  token;
  constructor(private formBuilder:FormBuilder,private toster:ToastrService,private dataService:DataService ,private router:Router) { }

  loginForm(){
    this.form=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }
  ngOnInit(): void {
    this.loginForm();
  }
  get f(){
    return this.form.controls;
  }
  submit(){
    this.submitted=true;
    if(this.form.invalid){
      return;
    }
    this.dataService.Login(this.form.value).subscribe(res=>{
      this.data=res;
      // console.log(res);
      if(this.data.status===1){
        this.token=this.data.data.token;
        localStorage.setItem('token',this.token);
        this.router.navigate(['/']);
        this.toster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),
        {
          timeOut:2000,
          progressBar:true
        });
      } else if(this.data.status===0){
        this.toster.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),
        {
          timeOut:2000,
          progressBar:true
        });
      }
    })
  }

}
