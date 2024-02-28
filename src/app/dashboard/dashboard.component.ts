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
  // cartSubscription!:Subscription
  // cartList!:any
  tokken:string = ""
  constructor(private httpService:HttpService,private bookService:BookService,private route:Router,private activateRoute:ActivatedRoute)
   {
    const navigation = this.route.getCurrentNavigation();
    if(navigation && navigation.extras.state) {
      const data = navigation.extras.state['data'];
      console.log(data);
      this.tokken = data
    }
  
    }

  ngOnInit(): void {
    // this.cartSubscription = this.bookService.cartListObservable.subscribe(
    // (res:any) => {
    //   debugger
    //   this.cartList = res
    //  }
    // )
    // if(this.cartList.length != 0)
    // {
    //   for(let cart of this.cartList)
    //   {
    //     this.httpService.addToCart({"bookId": cart.id,"quantity": cart.quantity},this.tokken).subscribe(res => console.log(res));
    //   }
    // }
    // this.httpService.getCart(this.tokken).subscribe(
    //   res =>
    //   {
    //       this.bookService.setCart(res.data);
    //   }
    // )
    this.httpService.getAllBooks().subscribe(
      res =>
      {
        this.bookService.setBooks(res.data);
      }
      )
      // this.httpService.getUser(this.tokken).subscribe(
      //   (res:any) =>{
      //     this.bookService.setUser(res.data)
      //   }
      // )
    // this.httpService.getAddress(this.tokken).subscribe(
    //   res => {
    //     this.bookService.setAddress(res.data)
    //   }
    //   )
    this.httpService.getAllReviews().subscribe(
      res => {
        this.bookService.setReviewList(res.data);
      }
    )
    this.httpService.getOrder().subscribe(
      res => {
        this.bookService.setOrderList(res.data)
      }
    )    
  }

}
