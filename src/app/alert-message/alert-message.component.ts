import { Component, OnInit ,Input, OnChanges, SimpleChanges} from '@angular/core';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent implements OnInit,OnChanges {
  @Input() show!:boolean;
  @Input() message!:string

  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.show)
  }

  ngOnInit(): void {
    
  }

}
