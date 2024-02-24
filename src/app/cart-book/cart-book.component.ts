import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-cart-book',
  templateUrl: './cart-book.component.html',
  styleUrls: ['./cart-book.component.scss']
})
export class CartBookComponent implements OnInit,OnDestroy {

  @Input() cart!:any
  @Input() input!:any
  
  cartNumber:number = 0
  cartList!:any
  subscription!:Subscription
  bookSubscription!:Subscription
  book!:any
  constructor(private httpService:HttpService,private bookService:BookService) { }
  ngOnInit(): void {
    this.subscription = this.bookService.cartListObservable.subscribe(
      (res:any) => this.cartList = res
    )
    this.bookSubscription = this.bookService.bookListObservable.subscribe(
      res => {
        this.book = res.filter(ele => ele.id == this.cart.id)
      }
    )
    this.cartNumber = this.cart.quantity
    
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe;
  }
  handleAmount(operation:string):void
  {
      operation == 'add' ? this.cartNumber = this.cartNumber + 1:this.cartNumber = this.cartNumber -1;
      if(this.cartNumber == 0)
      {
        this.cartNumber = 1
      }
      else if(this.cartNumber > this.book[0].quantity)
      {
        this.cartNumber = this.book[0].quantity
      }
      else{
        this.cartList = this.cartList.map(
          (res:any) => {
            if(res.id == this.cart.id)
            {
              res.quantity = this.cartNumber
            }
            return res;
          }
        )
        this.update()
        this.bookService.setCart(this.cartList)
      }
  }
  removeCart()
  {
    this.httpService.removeCart(this.cart.id).subscribe
        (
          res => {
            console.log(res)
            if(res.success)
            {
              this.cartList = this.cartList.filter((x:any) => x.id != this.cart.id)
              this.bookService.setCart(this.cartList)
            }
          }
        )
  }
  update()
  {
    console.log(this.book)
    this.httpService.updateCart({"quantity": this.cartNumber,
    "bookId":this.book[0].id }).subscribe(
      res =>  console.log(res)
    )
  }
}
