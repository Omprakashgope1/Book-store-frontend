import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private book:BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  bookRetrieve:Observable<Object> = this.book.asObservable();
  private toggle:BehaviorSubject<string> = new BehaviorSubject<string>('intro');
  toggleResult:Observable<string> = this.toggle.asObservable();
  private reviewList:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  reviewListObservable:Observable<any[]> = this.reviewList.asObservable();
  private user:BehaviorSubject<Object> = new BehaviorSubject<Object>({});
  userObservable:Observable<Object> = this.user.asObservable();
  private bookList:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  bookListObservable:Observable<any[]> = this.bookList.asObservable();
  private cartList:BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  cartListObservable:Observable<any[]> = this.cartList.asObservable(); 
  private searchValue:BehaviorSubject<string> = new BehaviorSubject<string>("");
  searchObservable:Observable<string> = this.searchValue.asObservable();
  private address = new BehaviorSubject<[]>([]);;
  addressObservable:Observable<[]> = this.address.asObservable();
  private tokken = new BehaviorSubject<string>("");
  tokkenObservable:Observable<string> = this.tokken.asObservable();
  private editToggle = new BehaviorSubject<boolean>(true);
  editTOggleObservable= this.editToggle.asObservable();
  private deliveryAddress = new BehaviorSubject<{}>({});
  deliveryAddressObservable = this.deliveryAddress.asObservable();
  private orderList = new BehaviorSubject<[]>([]);
  orderListObservable = this.orderList.asObservable();

  constructor() { }
  setBookInfo(noteObj?:{},desc?:string)
  {
    if(noteObj)
    {
      this.book.next(noteObj);
    }
    if(desc)
    this.toggle.next(desc);
  }
  setReviewList(reviews:any[])
  {
    this.reviewList.next(reviews);
  }
  setUser(User:{})
  {
    this.user.next(User);
  }
  setCart(cart:any[])
  {
    this.cartList.next(cart);
  }
  setBooks(book:[])
  {
    this.bookList.next(book);
  }
  setSearch(value:string)
  {
    this.searchValue.next(value)
  }
  setAddress(state:[])
  {
    this.address.next(state)
  }
  setTokken(state:string)
  {
    this.tokken.next(state);
  }
  setEditToggle(state:boolean)
  {
    this.editToggle.next(state)
  }
  setDeliveryAddress(address:{})
  {
    this.deliveryAddress.next(address)
  }
  setOrderList(state:[])
  {
    this.orderList.next(state);
  }
}
