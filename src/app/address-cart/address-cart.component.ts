import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { BookService } from '../services/book.service';
import { Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-address-cart',
  templateUrl: './address-cart.component.html',
  styleUrls: ['./address-cart.component.scss']
})
export class AddressCartComponent implements OnInit,OnChanges,OnDestroy{
  @Input() toggle!:boolean;
  @Input() value!:string
  @Input() inputField !:any
  editToggle:boolean = true;
  fullAddress!:string
  state!:string
  city!:string
  subscription!:Subscription;
  constructor(private bookService:BookService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if(this.toggle)
    {
      this.bookService.setDeliveryAddress(this.inputField);
    }
  }
  
  ngOnChanges(changes: SimpleChanges): void {
   console.log(changes)
  }

  ngOnInit(): void {
    this.subscription = this.bookService.editTOggleObservable.subscribe(res =>this.editToggle =res)
    this.fullAddress = this.inputField.fullAddress
    this.state = this.inputField.state
    this.city = this.inputField.city
    console.log(this.toggle)
  }
  editAddress()
  {
    this.bookService.setEditToggle(!this.editToggle)
  }
  }
