import { Component, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-order-cnt',
  templateUrl: './order-cnt.component.html',
  styleUrls: ['./order-cnt.component.scss']
})
export class OrderCntComponent implements OnInit {
  orderList:[] = []
  constructor(private httpService:HttpService) { }

  ngOnInit(): void {
    this.httpService.getOrder().subscribe( res =>
      {
        this.orderList = res.data
      }
    )
  }

}
