import { Injectable } from '@angular/core';
import { HttpService } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpService : HttpService)
  { }

  signUpfun(registerObj:{})
  {
    return this.httpService.singUpFun(registerObj);
  }
  loginFun(loginObj:{})
  {
    return this.httpService.loginFun(loginObj);
  }
}
