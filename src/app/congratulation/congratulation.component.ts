import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-congratulation',
  templateUrl: './congratulation.component.html',
  styleUrls: ['./congratulation.component.scss']
})
export class CongratulationComponent implements OnInit {
  userSubscription!:Subscription
  addressSubscription!:Subscription
  user:any = {}
  address:any = {}
  constructor(private bookService:BookService) { }

  ngOnInit(): void {
    this.userSubscription = this.bookService.userObservable.subscribe(
      res => this.user = res
    )
    this.addressSubscription = this.bookService.deliveryAddressObservable.subscribe(
      res => this.address = res
    )
  }

}
