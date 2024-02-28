import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { BookService } from '../services/book.service';
import {  Router } from '@angular/router';
import { MatIconRegistry } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { sign } from 'crypto';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!:FormGroup;
  subscription!:Subscription
  showAlert:boolean = false
  @Input() SignIn = true
  tokken:string = ""
  cartSubscription!:Subscription
  cartList!:any
  message:string = ""

  constructor(private userService:UserService,private formBuilder:FormBuilder,private bookService:BookService,private route:Router,
    private register:MatIconRegistry,private httpService:HttpService)
  { }

  ngOnInit(): void {
    this.subscription = this.bookService.tokkenObservable.subscribe(res =>
      {
        if(res)
        {
          // this.route.navigate(['/dashboard/home'],{state: {data:res}});
          this.tokken = res
          this.cartSubscription = this.bookService.cartListObservable.subscribe(
            (res:any) => {
              debugger
              this.cartList = res
             }
            )
            if(this.cartList.length != 0)
            {
              for(let cart of this.cartList)
              {
                this.httpService.addToCart({"bookId": cart.id,"quantity": cart.quantity},this.tokken).subscribe(res => console.log(res));
              }
            }
            this.httpService.getCart(this.tokken).subscribe(
              res =>
              {
                  this.bookService.setCart(res.data);
              }
            )
            this.httpService.getUser(this.tokken).subscribe(
              (res:any) =>{
                this.bookService.setUser(res.data)
              }
            )
            this.httpService.getAddress(this.tokken).subscribe(
              res => {
                this.bookService.setAddress(res.data)
              }
              )
              this.bookService.setToggleLoginCart(false);
              this.bookService.setToggleSignUp(false)
        }
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
      this.message = 'Login successful'
      this.showAlert = true;
      setTimeout(() =>
      {
        this.showAlert = false;
      },3000)
    }
    else{
      this.message = 'wrong username or password'
      this.showAlert = true;
      setTimeout(() =>
      {
        this.showAlert = false;
      },5000)
    }
  }
  handleSignUp()
  {
    this.bookService.setShowSignUp(true)
  }
  handleForget()
  {
    this.route.navigate(['/forgetpassword'])
  }

}
