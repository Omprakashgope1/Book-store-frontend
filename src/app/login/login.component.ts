import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import {  Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!:FormGroup;
  subscription!:Subscription
  showAlert:boolean = false

  constructor(private userService:UserService,private formBuilder:FormBuilder,private bookService:BookService,private route:Router,
    private register:MatIconRegistry)
  { }

  ngOnInit(): void {
    this.subscription = this.bookService.tokkenObservable.subscribe(res =>
      {
        if(res)
        this.route.navigate(['/dashboard/home'],{state: {data:res}});
      })
    this.loginForm = this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]]
      }
    )
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
  get fun(){
    return this.loginForm.controls;
  }
  async handleLogin()
  {
    const{email,password} = this.loginForm.value;
    const res = await this.userService.loginFun({email:email,password:password})
    if(res?.success)
    {
      sessionStorage.setItem('bookTokken',res.data)
      this.bookService.setTokken(res.data);
    }
    else{
      this.showAlert = true;
      setTimeout(() =>
      {
        this.showAlert = false;
      },5000)
    }
  }
  handleSignUp()
  {
    this.route.navigate(['/signup'])
  }
  handleForget()
  {
    this.route.navigate(['/forgetpassword'])
  }

}
