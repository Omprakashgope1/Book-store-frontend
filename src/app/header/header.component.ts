import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {CART_ICON, SEARCH_ICON, TRASH_ICON, USER_ICON } from 'src/assets/icons';
import { BookService } from '../services/book.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Http2SecureServer } from 'http2';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  host:
  {
    class : "app-header"
  }
})
export class HeaderComponent implements OnInit,OnDestroy {
  userSubscription!:Subscription
  cartSubscription!:Subscription
  searchQuery!:string
  showSignUp:boolean = false
  user:any = {};
  cartCount:number = 0;
  barToggle:boolean = false;
  toggleSignUp:boolean = false
  constructor(public iconRegistry: MatIconRegistry, public sanitizer: DomSanitizer,private bookService:BookService,private route:Router,private httpService:HttpService,
    public router:Router)
  {
    iconRegistry.addSvgIconLiteral('search-icon',sanitizer.bypassSecurityTrustHtml(SEARCH_ICON))
    iconRegistry.addSvgIconLiteral('user-icon',sanitizer.bypassSecurityTrustHtml(USER_ICON))
    iconRegistry.addSvgIconLiteral('cart-icon',sanitizer.bypassSecurityTrustHtml(CART_ICON))  }
  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.userSubscription = this.bookService.userObservable.subscribe(
      res => this.user = res
    )
    this.bookService.toggleSignUpObservable.subscribe(res => this.toggleSignUp = res)
    this.cartSubscription = this.bookService.cartListObservable.subscribe(
      res => this.cartCount = res.length
    )
    this.bookService.showSignUpObservable.subscribe(res => 
      {
        debugger
        this.showSignUp = res
      })
  }
  handleToggle()
  {
    this.bookService.setBookInfo({},'intro');
    this.route.navigate(['/dashboard/home'])
  }
  handleCart()
  {
    this.bookService.setBookInfo(undefined,'cart');
    this.route.navigate(['/dashboard/cart'])
  }
  updateSearchQuery()
  {
    if(this.route.url == '/dashboard/home') { 
      this.bookService.setSearch(this.searchQuery)
    }
  }
  toggleLoginBar()
  {
    this.barToggle = !this.barToggle
  }
}
