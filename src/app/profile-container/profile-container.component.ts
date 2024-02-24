import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../services/http.service';
import { Subscription } from 'rxjs';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-profile-container',
  templateUrl: './profile-container.component.html',
  styleUrls: ['./profile-container.component.scss'],
  host:
  {
    class:"app-profile"
  }
})
export class ProfileContainerComponent implements OnInit {
  userDetailForm!:FormGroup
  isReadOnly:boolean = true
  userSubscription!:Subscription
  addressSubscription!:Subscription
  EditSpan:string = "Edit"
  userNameVal:string = ""
  mobNumVal:string = ""
  emailVal:string = ""
  addressInput:string = "Home"
  fullAddress!:any
  fullAddressVal!:string;
  cityVal!:string;
  stateVal!:string;
  isReadOnly2:boolean = true
  editSpan2:string = 'Edit';
  user!:{
    email:string,fullName:string,mobnum:string
  }
  constructor(private formBuilder:FormBuilder,private httpService:HttpService,private bookService:BookService) 
  {
      
  }

  ngOnInit(): void {
    this.userSubscription = this.bookService.userObservable.subscribe((res:any) => {
      this.user = res
      this.userNameVal = this.user.fullName
      this.mobNumVal = this.user.mobnum
      this.emailVal = this.user.email
    })
    this.addressSubscription = this.bookService.addressObservable.subscribe((res:any) => {
      this.fullAddress = res
    })
    this.userDetailForm = this.formBuilder.group(
      {
        email:['',[Validators.required,Validators.email]],
        password:['',[Validators.required,Validators.minLength(6)]],
        name:['',[Validators.required]],
        mobnum:['',[Validators.required,Validators.maxLength(15)]],
      });
  }
  formUserCall()
  {
    return this.userDetailForm.controls
  }
  profileEdit()
  {
    this.isReadOnly = this.isReadOnly ? false : true
    this.EditSpan = this.EditSpan == "Cancel" ? "Edit":"Cancel"
  }
 
  saveDetail()
  {
    this.EditSpan = "Edit"
    this.isReadOnly = true
    const {name,email,password,mobnum} = this.userDetailForm.value;
    this.httpService.updateUser({fullName:name,email:email,password:password,mobnum:mobnum}).subscribe(
      res => this.bookService.setUser(res.data)
    )
  }
  addNewAddress()
  { 
    this.fullAddress.unshift({})
  }
}
