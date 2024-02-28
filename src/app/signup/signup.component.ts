import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators ,FormBuilder} from '@angular/forms';
import { UserService} from '../services/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm!:FormGroup;
  submitted : boolean = false;
  showAlert!:boolean
  showSignUp!:boolean
  subscription!:Subscription
  message:string = ""

  constructor(public formBuilder:FormBuilder,public userService:UserService,private route:Router,private bookService:BookService) { }

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
    const {fullName,email,password,mobnum} = this.signupForm.value;
    this.userService.signUpfun({fullName: fullName, email: email, password: password, mobnum: mobnum}).subscribe(
      (res: any) => {
        console.log(res);
        if(res.success)
        {
          this.message = "login Successful"
          this.showAlert = true
          setTimeout(() =>
          {
            this.showAlert = false
          },5000)
        }
        else{
          this.message = "invalid user"
          this.showAlert = true
          setTimeout(() =>
          {
            this.showAlert = false
          },5000)
        }
      },
      (err: any) => {
        this.message = "invalid user"
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
    debugger
    this.bookService.setShowSignUp(false)
  }


}
