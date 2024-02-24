import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  host:
  {
    class : "app-forget-password"
  }
})
export class ForgetPasswordComponent implements OnInit {
  email!:string;
  constructor() { }

  ngOnInit(): void {
  }
  handleReset()
  {
      
  }
}
