import { Component, OnDestroy, OnInit } from '@angular/core';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { HEART_ICON, PROFILE_ICON, ORDER_ICON } from 'src/assets/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-bar',
  templateUrl: './login-bar.component.html',
  styleUrls: ['./login-bar.component.scss']
})
export class LoginBarComponent implements OnInit,OnDestroy {
  loginUser!:any
  state:boolean = false
  userSubscrtiption!:Subscription
  constructor(private bookService:BookService,private register:MatIconRegistry,private sanitizer:DomSanitizer,private route:Router) 
  {
    register.addSvgIconLiteral('heart-icon',sanitizer.bypassSecurityTrustHtml(HEART_ICON)),
    register.addSvgIconLiteral('profile-icon',sanitizer.bypassSecurityTrustHtml(PROFILE_ICON)),
    register.addSvgIconLiteral('order-icon',sanitizer.bypassSecurityTrustHtml(ORDER_ICON))
  }

  ngOnInit(): void {
   this.userSubscrtiption = this.bookService.userObservable.subscribe(res => this.loginUser = res)
   if(Object.keys(this.loginUser).length === 0)
   {
      this.state = true
   }
  }
  ngOnDestroy(): void {
    this.userSubscrtiption.unsubscribe();
  }
  handleLogOut()
  {
    this.bookService.setTokken("")
    sessionStorage.removeItem('bookTokken')
    this.loginUser = {}
    this.bookService.setUser({})
    this.bookService.setOrderList([])
    this.bookService.setAddress([])
    this.bookService.setCart([])
    this.state = true;
    this.route.navigate(['']);
  }
}
