import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BookContainerComponent } from './book-container/book-container.component';
import { ProfileContainerComponent } from './profile-container/profile-container.component';
import { BookIntroComponent } from './book-intro/book-intro.component';
import { HomePageComponent } from './home-page/home-page.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { CartComponent } from './cart/cart.component';
import { WishlistOrderlistComponent } from './wishlist-orderlist/wishlist-orderlist.component';
import { WishlistLoginComponent } from './wishlist-login/wishlist-login.component';
import { CongratulationComponent } from './congratulation/congratulation.component';
import { CartBookComponent } from './cart-book/cart-book.component';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { OrderCntComponent } from './order-cnt/order-cnt.component';
import { SearchPipe } from './search.pipe';
import { LoginBarComponent } from './login-bar/login-bar.component';
import { EditCartAddressComponent } from './edit-cart-address/edit-cart-address.component';
import { AlertMessageComponent } from './alert-message/alert-message.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    ForgetPasswordComponent,
    HeaderComponent,
    DashboardComponent,
    BookContainerComponent,
    ProfileContainerComponent,
    BookIntroComponent,
    HomePageComponent,
    BookOverviewComponent,
    CartComponent,
    WishlistOrderlistComponent,
    WishlistLoginComponent,
    CongratulationComponent,
    CartBookComponent,
    AddressCartComponent,
    OrderCntComponent,
    SearchPipe,
    LoginBarComponent,
    EditCartAddressComponent,
    AlertMessageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
