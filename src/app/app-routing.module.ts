import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileContainerComponent } from './profile-container/profile-container.component';
import { BookIntroComponent } from './book-intro/book-intro.component';
import { BookOverviewComponent } from './book-overview/book-overview.component';
import { CartComponent } from './cart/cart.component';
import { WishlistOrderlistComponent } from './wishlist-orderlist/wishlist-orderlist.component';
import { WishlistLoginComponent } from './wishlist-login/wishlist-login.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CongratulationComponent } from './congratulation/congratulation.component';
import { AddressCartComponent } from './address-cart/address-cart.component';
import { OrderCntComponent } from './order-cnt/order-cnt.component';
import { LoginBarComponent } from './login-bar/login-bar.component';

const routes: Routes = [
  {path:"login",component:LoginComponent},
  {path:"signup",component:SignupComponent},
  {path:"forgetpassword",component:ForgetPasswordComponent},
  {path:"dashboard",component:DashboardComponent,children:
  [
    {path:"overview/:bookId",component:BookOverviewComponent},
    {path:"profile",component:ProfileContainerComponent},
    {path:"cart",component:CartComponent},
    {path:"home",component:HomePageComponent},
    {path:"success",component:CongratulationComponent},
    {path:"profile",component:ProfileContainerComponent},
    {path:"order",component:OrderCntComponent},
    {path:"celebration",component:CongratulationComponent}
  ]},
  {path:"",redirectTo: '/dashboard/home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
