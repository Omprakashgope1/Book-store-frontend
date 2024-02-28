import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { GPS_ICON } from 'src/assets/icons';
import { BookService } from '../services/book.service';
import { HttpService } from '../services/http.service';
import { Subscription, isEmpty } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit,OnDestroy,OnChanges {
  addressSubscription!:Subscription
  addressSummary:boolean = false;
  orderSummary:boolean = false;
  input1:boolean = true;
  input2:boolean = false;
  cartList!:any
  subscription!:Subscription
  userSubscription!:Subscription
  user!:any
  inputToggle:string = "address1"
  completeAddress!:any
  showLogin:boolean = false
  bookList!:[]
  tokkenSubscription!:Subscription
  loginToggleSubscription!:Subscription
  tokken!:string
  
  constructor(private register:MatIconRegistry,private sanitizer:DomSanitizer,private bookService:BookService,private httpSerVice :HttpService,private route:Router)
  {
      register.addSvgIconLiteral('gps-icon',sanitizer.bypassSecurityTrustHtml(GPS_ICON))
  }

  ngOnInit(): void {
    this.tokkenSubscription = this.bookService.tokkenObservable.subscribe(res => this.tokken = res)
    this.loginToggleSubscription = this.bookService.toggleLoginCartObservable.subscribe(
        res => this.showLogin = res
    )
    this.addressSubscription = this.bookService.addressObservable.subscribe(
      (res:any) => {
        this.completeAddress = res
        if(this.completeAddress.length ==0)
        this.completeAddress.push({})
        this.completeAddress.reverse()
      }
    )
    this.subscription = this.bookService.cartListObservable.subscribe(
      (res:any) => this.cartList = res
    )
    this.userSubscription = this.bookService.userObservable.subscribe
    (
      (res:any) => this.user = res
    )
  }
  ngOnChanges(): void {
    console.log('i have been called')
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.userSubscription.unsubscribe();
  }
  openAddress()
  {
    if(Object.keys(this.user).length == 0)
   {
    this.bookService.setToggleLoginCart(true)
   } 
   else{
    this.addressSummary = true;
   }
  }
  openOrderSummary()
  {
    this.orderSummary = true;
  }
 
  handleOrder()
  {
   
    let orderObj:any[] = this.cartList.map((res:any) =>
      {
        return {bookId:res.id,quantity:res.quantity}
      })
    this.httpSerVice.addOrder(orderObj,this.tokken).subscribe
    (
      res => {
        this.bookService.setCart([])
        this.httpSerVice.getAllBooks().subscribe(res => {
          this.bookService.setBooks(res.data)
          console.log(res.data)})

        this.route.navigate(['/dashboard/celebration'])
      }
    )
  }
handleChange(value:any)
{
  this.inputToggle = value
  this.input1 = !this.input1;
  this.input2 = !this.input2
}
addAddress()
{
  this.completeAddress.unshift({})
}
}
