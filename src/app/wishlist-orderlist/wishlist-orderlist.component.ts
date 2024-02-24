import { Component, OnInit,Input } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { DELETE_FOREVER_ICON } from 'src/assets/icons';

@Component({
  selector: 'app-wishlist-orderlist',
  templateUrl: './wishlist-orderlist.component.html',
  styleUrls: ['./wishlist-orderlist.component.scss']
})
export class WishlistOrderlistComponent implements OnInit {
  @Input() order!:any

  constructor(private register:MatIconRegistry,private sanitizer:DomSanitizer)
  {
      register.addSvgIconLiteral('delete-forever-icon',sanitizer.bypassSecurityTrustHtml(DELETE_FOREVER_ICON))
  }

  ngOnInit(): void {
    console.log(this.order)
  }

}
