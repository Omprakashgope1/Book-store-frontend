import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { UserService} from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  submitted : boolean = false;
  showAlert!:boolean

  constructor(public formBuilder:FormBuilder,public userService:UserService,private route:Router) { }

  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      email:['',[Validators.required,Validators.email]],
      mobnum:['',[Validators.required]]
    });
  }
  get f(){
    return this.signupForm.controls;
  }
  handleSignUp()
  {
    this.submitted = true;
    console.log("hello");
    const {fullName,email,password,mobnum} = this.signupForm.value;
    this.userService.signUpfun({fullName: fullName, email: email, password: password, mobnum: mobnum}).subscribe(
      (res: any) => {
        console.log(res);
        if(res.success)
        {
          this.route.navigate(['/login'])
        }
        else{
          debugger
          this.showAlert = true
          setTimeout(() =>
          {
            this.showAlert = false
          },5000)
        }
      },
      (err: any) => {
        this.showAlert = true
          setTimeout(() =>
          {
            this.showAlert = false
          },5000)
        console.log(err);
      }
    );
  }
  handleLogin()
  {
      this.route.navigate(['/login'])
  }


}
