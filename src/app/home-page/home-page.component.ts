import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BookService } from '../services/book.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  host:
  {
    class : 'app-home-page'
  }
})
export class HomePageComponent implements OnInit,OnDestroy {
  bookList:any[]=[];
  subsription!:Subscription
  subscribleSearch!:Subscription
  searchValue!:string 

  constructor(private httpService : HttpService,private bookService:BookService) { }

  ngOnInit(): void {
    this.subsription = this.bookService.bookListObservable.subscribe
    (
      (res:any) => this.bookList = res
    )
    this.subscribleSearch = this.bookService.searchObservable.subscribe
    (
      (res:any) => this.searchValue = res
    )
  }
  ngOnDestroy():void
  {
    this.subsription.unsubscribe;
    this.subscribleSearch.unsubscribe;
  }

}
