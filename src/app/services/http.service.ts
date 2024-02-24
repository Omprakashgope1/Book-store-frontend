import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { BookService } from './book.service';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  bookTokken:string =sessionStorage.getItem("bookTokken") || "";

  header:{} = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.bookTokken}`
    })
  }
  constructor(public http:HttpClient,private bookService:BookService)
  {
  }
  singUpFun(registerObj:{}):Observable<any>
  {
    return this.http.post('https://localhost:7042/api/User/Register',registerObj);
  }
  async loginFun(loginObj:{}):Promise<any>
  {
    try
    {
      const res = await this.http.put('https://localhost:7042/api/User/login',loginObj).toPromise();
      return res;
    }
    catch(Exception)
    {
      return Exception
    }
  }
  getAllBooks():Observable<any>
  {
    return this.http.get('https://localhost:7042/api/Book/GetAll');
  }
  addReviews(reviewObj:{}):Observable<any>
  {
    return this.http.post('https://localhost:7042/api/Review/AddReviews',reviewObj,this.header);
  }
  getReviews(bookId:number):Observable<any>
  {
    return this.http.get(`https://localhost:7042/api/Review/GetReviews?bookId=${bookId}`);
  }
  addToCart(addObj:{}):Observable<any>
  {
    return this.http.post(`https://localhost:7042/api/Cart/addToCart`,addObj,this.header);
  }
  getUser(tokken:string):Observable<any>
  {
    const header:{} = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokken}`
      })
    }
    if(tokken)
    return this.http.get('https://localhost:7042/api/User/LoggedInUser',header);
    return this.http.get('https://localhost:7042/api/User/LoggedInUser',this.header);
  } 
  getCart(tokken:string):Observable<any>
  {
    const header:{} = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokken}`
      })
    }
    if(tokken)
    return this.http.get('https://localhost:7042/api/Cart/GetCart',header);
    return this.http.get('https://localhost:7042/api/Cart/GetCart',this.header);
  }
  getBookById(id:number):Observable<any>
  {
    return this.http.get(`https://localhost:7042/api/Book/BookById?id=`+id);
  }
  updateCart(updateCartObj:{}):Observable<any>
  {
    return this.http.put('https://localhost:7042/api/Cart/UpdateQuantity',updateCartObj,this.header)
  }
  removeCart(bookId:number):Observable<any>
  {
    return this.http.delete(`https://localhost:7042/api/Cart/removeCart?bookId=${bookId}`,this.header)
  }
  updateUser(userObj:{}):Observable<any>
  {
    return this.http.put('https://localhost:7042/api/User/updateUser',userObj,this.header);
  }
  addOrder(orderObj:{}):Observable<any>
  {
    return this.http.post(`https://localhost:7042/api/Order/AddAll`,orderObj,this.header);
  }
  getOrder():Observable<any>
  {
    return this.http.get('https://localhost:7042/api/Order/GetAllOrders',this.header);
  }
  getAddress(tokken:string):Observable<any>
  {
    const header:{} = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${tokken}`
      })
    }
    if(tokken)
    return this.http.get('https://localhost:7042/api/Address/getAddress',header)
    return this.http.get('https://localhost:7042/api/Address/getAddress',this.header)
  }
  updateAddress(addressObj:{}):Observable<any>
  {
    return this.http.put('https://localhost:7042/api/Address/updateAddress',addressObj,this.header);
  }
  addAddress(addressObj:{}):Observable<any>
  {
    return this.http.post('https://localhost:7042/api/Address/addAddress',addressObj,this.header);
  }
  getAllReviews():Observable<any>
  {
    return this.http.get('https://localhost:7042/api/Review/GetAllReviews');
  }
}
