import { Component, Input, OnInit } from '@angular/core';
import { HttpService } from '../services/http.service';
import { BookService } from '../services/book.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-cart-address',
  templateUrl: './edit-cart-address.component.html',
  styleUrls: ['./edit-cart-address.component.scss']
})
export class EditCartAddressComponent implements OnInit {
  userDetailForm!:FormGroup
  homeAddress:any = {};
  workAddress:any = {};
  otherAddress:any = {};
  fullAddressVal!:string;
  cityVal!:string;
  stateVal!:string;
  isReadOnly2:boolean = true
  addressInput:string = "Home"
  editSpan2:string = "Edit"
  @Input() inputAddress:any
  @Input() count!:number
  constructor(private httpService:HttpService,private bookService:BookService,private formBuilder:FormBuilder) { }
  
  ngOnInit(): void {
    this.fullAddressVal = this.inputAddress.fullAddress
    this.cityVal = this.inputAddress.city
    this.stateVal = this.inputAddress.state
    this.addressInput = this.inputAddress.type == 1 ? 'Home':this.inputAddress.type == 2 ? 'Work':'Other'
    console.log(this.inputAddress + " " + this.addressInput)
    this.userDetailForm = this.formBuilder.group(
      {
        fullAddress:['',[Validators.required]],
        city:['',[Validators.required]],
        state:['',[Validators.required]]
      });
  }
  changeInput(value:string)
  {
    this.addressInput = value
  }
  saveAddress()
  {
    this.editSpan2 = "Edit"
    this.isReadOnly2 = true
    const {fullAddress,city,state} = this.userDetailForm.value;
    const type = this.addressInput == 'Home' ? 1 : this.addressInput == 'Work' ? 2:3
    const addressId = this.inputAddress.addressId
    console.log(fullAddress + " " + city + " " + state)
    if(addressId)
    {
        this.httpService.updateAddress({"fullAddress": fullAddress,
      "city": city,
      "state": state,
      "type": type,
      addressId : this.inputAddress.addressId}).subscribe(
        res => {
        this.bookService.setAddress(res.data)
        this.bookService.setEditToggle(true)
      }
      )
    }else{
      this.httpService.addAddress({"fullAddress": fullAddress,
      "city": city,
      "state": state,
      "type": type}).subscribe(
         res => {
          this.bookService.setAddress(res.data)
          this.bookService.setEditToggle(true)
        }
      )
    }
     
  }
  addressEdit()
  {
    this.isReadOnly2 = !this.isReadOnly2
    this.editSpan2 = this.editSpan2 == "Cancel" ? "Edit":"Cancel"
  }
}
