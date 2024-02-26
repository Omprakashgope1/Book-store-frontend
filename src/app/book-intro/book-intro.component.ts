import { Component, Input, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { STAR_ICON } from 'src/assets/icons';
import { BookService } from '../services/book.service';
import { Router } from '@angular/router';
import { HttpService } from '../services/http.service';

@Component({
  selector: 'app-book-intro',
  templateUrl: './book-intro.component.html',
  styleUrls: ['./book-intro.component.scss'],
  host:
  {
    class : 'app-book-intro'
  }
})
export class BookIntroComponent implements OnInit {
  @Input() book!:{
    title:string,
    author:string,
    image:string,
    price:number,
    description:string, 
    id:number,
    quantity:number
  };
  reviewRating:number = 0
  mrpPrice:number = 0;
  count:number = 0;

  constructor(public register:MatIconRegistry,public sanitizer:DomSanitizer,private bookService:BookService,private route:Router,private httpService:HttpService) 
  {
    register.addSvgIconLiteral('star-icon',sanitizer.bypassSecurityTrustHtml(STAR_ICON))
  }

  ngOnInit(): void {
    this.httpService.getReviews(this.book.id).subscribe(res => 
      {
        for(let review of res.data)
        {
            this.count++;
            this.reviewRating += review.star
        }
        if(this.reviewRating != 0)
        this.reviewRating /= res.data.length
        this.reviewRating = Math.round(this.reviewRating * 10) / 10
      })
    this.mrpPrice = Math.floor(this.book.price * 1.1);
    
  }
  handleToggle()
  {
    this.bookService.setBookInfo(this.book,'desc');
    this.route.navigate([`/dashboard/overview/${this.book.id}`])
  }
}
