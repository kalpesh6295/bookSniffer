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
  {path: 'checkout', component: CheckoutComponent},
  {path: ':medium/:board/:class', component: ProductComponent
]


@NgModule({
  declarations: [
    
    AppComponent,
    FormComponent,
    ProductComponent,
    CartComponent,
    CheckoutComponent
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
  providers: [CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
