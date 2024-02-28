import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BLACK_STAR_ICON, STAR_ICON, YELLOW_STAR_ICON } from 'src/assets/icons';
import { BookService } from '../services/book.service';
import { Subscription, elementAt } from 'rxjs';
import { HttpService } from '../services/http.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-book-overview',
  templateUrl: './book-overview.component.html',
  styleUrls: ['./book-overview.component.scss']
})
export class BookOverviewComponent implements OnInit,OnDestroy,OnChanges{
  
  cartSubscription!:Subscription;
  cartList!:any[];
  toggle:boolean = false;
  book!:{
    title:string,
    author:string,
    image:string,
    price:number,
    description:string,
    id:any,
    quantity:number
  };
  review!:string;
  commentList!:[
    {name:string,
    review:string,
    star:number,
    bookId:number,
    nameStarting:string
  }
  ];
  idBook!:number
  amountToggle:number = 0;
  starCount:number = 0;
  countStar:number = 0;
  tokken:string = ""
  constructor(private sanitizer:DomSanitizer,private register:MatIconRegistry,private bookService:BookService,
    private httpService:HttpService,private activatedRoute:ActivatedRoute)
  {
      register.addSvgIconLiteral('star-icon',sanitizer.bypassSecurityTrustHtml(STAR_ICON))
      register.addSvgIconLiteral('black-star-icon',sanitizer.bypassSecurityTrustHtml(BLACK_STAR_ICON))
      register.addSvgIconLiteral('yellow-icon',sanitizer.bypassSecurityTrustHtml(YELLOW_STAR_ICON))
  }

  ngOnInit(): void {
    this.bookService.tokkenObservable.subscribe(res => this.tokken = res)
    this.idBook = this.activatedRoute.snapshot.params['bookId']
    this.cartSubscription = this.bookService.cartListObservable.subscribe(
      (res:any) => {
        this.cartList = res
        this.cartToggle()
      } 
    )
      
    this.httpService.getBookById(this.idBook).subscribe
    (
      (res:any) =>{ 
        this.book = res.data
      }
    )
    this.httpService.getReviews(this.idBook).subscribe(
      (res:any) =>{
           this.commentList = res.data;
           for(let i = 0;i < this.commentList.length;i++)
           {
              this.countStar += this.commentList[i].star
              let nameStarting = this.commentList[i].name.charAt(0)
              for(let j = 0;j<this.commentList[i].name.length;j++)
              {
                if(this.commentList[i].name.charAt(j) == ' ')
                {
                  nameStarting = nameStarting + this.commentList[i].name.charAt(j+1)
                  break
                }
              }
              nameStarting = nameStarting.toUpperCase()
              this.commentList[i].nameStarting = nameStarting
           }
           this.bookService.setReviewList(this.commentList);
           if(this.countStar != 0)
           this.countStar /= this.commentList.length
            this.countStar = Math.round(this.countStar * 10) / 10;
      },
      err => console.log(err)
    )
  }
  ngOnDestroy(): void {
    this.cartSubscription.unsubscribe()
  }
  ngOnChanges(changes: SimpleChanges): void {
    
  }
  addReviews()
  {
    debugger
      this.httpService.addReviews({review: this.review,star: this.starCount,bookId: this.book.id}).subscribe(
        res =>{
           this.countStar *= this.commentList.length
          this.countStar += this.starCount
        this.commentList = (res.data);
        for(let i = 0;i < this.commentList.length;i++)
           {
              let nameStarting = this.commentList[i].name.charAt(0)
              for(let j = 0;j<this.commentList[i].name.length;j++)
              {
                if(this.commentList[i].name.charAt(j) == ' ')
                {
                  nameStarting = nameStarting + this.commentList[i].name.charAt(j+1)
                  break
                }
              }
              nameStarting = nameStarting.toUpperCase()
              this.commentList[i].nameStarting = nameStarting
           }
        this.commentList.reverse()
        this.countStar /= this.commentList.length
        this.countStar = Math.round(this.countStar * 10) / 10;
        this.starCount = 0
        this.review = ""
        }
      )
  }
  addToCart()
  {
    this.httpService.addToCart({"bookId": this.book.id,"quantity": 1},this.tokken).subscribe(
      (res:any)=> {
      this.cartList = res.data
      },err => {
        const addObj:{}= {
          id: this.book.id,
        "title": this.book.title,
        "description": this.book.description,
        "author": this.book.author,
        "price": this.book.price,
        "quantity": 1,
        "image":this.book.image
        }
        this.cartList.push(addObj)
      }
    )
    this.amountToggle++;
    this.toggle = true;
  }
  cartToggle()
  {
    let cart:any[] = this.cartList.filter(
      (x:any) => x.id == this.idBook
    )
    if(cart.length > 0)
    {
      this.toggle = true;
      this.amountToggle = cart[0].quantity
    }
  }
  handleAmount(operation:string)
  {
    // debugger
    operation == 'add' ? this.amountToggle = this.amountToggle + 1:this.amountToggle = this.amountToggle -1;
    console.log(this.amountToggle)
    if(this.amountToggle == 0)
    {
      this.httpService.removeCart(this.idBook,this.tokken).subscribe(
        res => console.log(res)
      )
      this.cartList = this.cartList.filter((x:any) => x.id != this.idBook)
      this.bookService.setCart(this.cartList)
      this.toggle = false;
    }
    else if(this.amountToggle > this.book.quantity)
      {
        this.amountToggle = this.book.quantity
      }
    else{
      this.updateCart();
    }
  }
  updateCart()
  {
    this.httpService.updateCart({"quantity": this.amountToggle,
    "bookId":this.idBook },this.tokken).subscribe(
      res =>  console.log(res)
    )
    this.cartList.map((res:any) =>
      {
        if(this.idBook == res.id)
        {
            res.quantity = this.amountToggle
            return res
        }
        else
            return res
      })
      this.bookService.setCart(this.cartList)
  }
  addRating(value:number)
  {
    this.starCount = value
  }
}


