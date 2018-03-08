import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { FormComponent } from './homepage/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

const config = {
  apiKey: "AIzaSyDoV_rdaRnkk-myi6BpKpIbqkW7DGRo7Vs",
  authDomain: "edbirdworkshop.firebaseapp.com",
  databaseURL: "https://edbirdworkshop.firebaseio.com",
  projectId: "edbirdworkshop",
  storageBucket: "edbirdworkshop.appspot.com",
  messagingSenderId: "802224392824"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
