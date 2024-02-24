import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  host:
  {
    class :"app-dashboard"
  }
})
export class DashboardComponent implements OnInit {
  cartSubscription!:Subscription
  cartList!:[]
  tokken:string = ""
  constructor(private httpService:HttpService,private bookService:BookService,private route:Router,private activateRoute:ActivatedRoute)
   {
    const navigation = this.route.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      const data = navigation.extras.state['data'];
      console.log(data);
      this.tokken = data
    }
  
    }

  ngOnInit(): void {
    // console.log(localStorage.getItem('bookTokken'))
    this.cartSubscription = this.bookService.cartListObservable.subscribe(
    (res:any) => {
      this.cartList = res
     }
    )
    this.httpService.getCart(this.tokken).subscribe(
      res =>
      {
          this.bookService.setCart(res.data);
          console.log(res);
      }
    )
    this.httpService.getAllBooks().subscribe(
      res =>
      {
        this.bookService.setBooks(res.data);
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
    this.httpService.getAllReviews().subscribe(
      res => {
        this.bookService.setReviewList(res.data);
      }
    )
      if(this.cartList.length != 0)
      {
        let sendObj:any[] = this.cartList.map((ele:{id:Number,quantity:number}) =>
          {
            return {bookId:ele.id,quantity:ele.quantity}
          })
        this.route.navigate(['/dashboard/cart'])
      }
      this.httpService.getOrder().subscribe(
        res => {
          this.bookService.setOrderList(res.data)
        }
      )
      
  }

}
