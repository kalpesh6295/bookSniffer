import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as firebase from 'firebase';
import{ Routes,RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { FormComponent } from './homepage/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ProductComponent } from './product/product.component';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CartComponent } from './cart/cart.component';
import { CartService } from './cart.service';
import { StorageServiceModule} from 'angular-webstorage-service';
import { CheckoutComponent } from './checkout/checkout.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignUpComponent } from './auth/signup/signup.component';
import { AuthService } from "./auth/auth.service";
import { ForgetComponent } from "./auth/forget/forget.component";
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ContactusComponent } from './contactus/contactus.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { OrderComponent } from './order/order.component';
import { ProfileComponent } from './profile/profile.component';
import { OrderdetailsComponent } from './orderdetails/orderdetails.component';

const config = {
  apiKey: "AIzaSyDoV_rdaRnkk-myi6BpKpIbqkW7DGRo7Vs",
  authDomain: "edbirdworkshop.firebaseapp.com",
  databaseURL: "https://edbirdworkshop.firebaseio.com",
  projectId: "edbirdworkshop",
  storageBucket: "edbirdworkshop.appspot.com",
  messagingSenderId: "802224392824"
};
firebase.initializeApp(config);
const appRoutes:Routes=[
  {path: '',component: FormComponent},
  {path: 'cart', component: CartComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'checkout', component: CheckoutComponent},
  {path: 'order', component: OrderComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'orderdetails', component: OrderdetailsComponent},
  {path: ':medium/:board/:class', component: ProductComponent},
  {path : 'reset',component:ForgetComponent},
  {path:'contactus',component:ContactusComponent},
  {path:'**', redirectTo:''}
]


@NgModule({
  declarations: [
    
    AppComponent,
    FormComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent,
    SigninComponent,
    SignUpComponent,
    ForgetComponent,
    HeaderComponent,
    FooterComponent,
    ContactusComponent,
    SideMenuComponent,
    OrderComponent,
    ProfileComponent,
    OrderdetailsComponent
  ],
  imports: [
    HttpClientModule,
    HttpModule,
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    StorageServiceModule
  ],
  providers: [CartService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
