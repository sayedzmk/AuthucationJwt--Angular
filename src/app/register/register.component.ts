import { Component, OnInit } from '@angular/core';
import { MustMatch } from '../confirmed.validator';
import { FormBuilder,FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  data:any;
  constructor(private formBuilder:FormBuilder,private toster:ToastrService,private dataService:DataService ,private router:Router) { }
  createForm(){
    this.form=this.formBuilder.group({
      name:[null,Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(6)]],
      confirmtionPassword:['',Validators.required]
    },
    {
      validator: MustMatch('password', 'confirmtionPassword')
    }
    );
  }
  ngOnInit(): void {
    this.createForm();
  }
  get f(){
    return this.form.controls;
  }
  submit(){
    this.submitted=true;
    if(this.form.invalid){
      return;
    }
    this.dataService.registerUser(this.form.value).subscribe(res=>{
      this.data=res;
      // console.log(res);
      if(this.data.status===1){
        this.router.navigate(['login']);
        this.toster.success(JSON.stringify(this.data.message),JSON.stringify(this.data.code),
        {
          timeOut:2000,
          progressBar:true
        });
      } else{
        this.toster.error(JSON.stringify(this.data.message),JSON.stringify(this.data.code),
        {
          timeOut:2000,
          progressBar:true
        });
      }
    });

  }
}
