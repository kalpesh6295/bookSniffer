import { AbstractControl } from '@angular/forms';
import { Component, OnInit, Injectable,Inject } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import {CartService} from '../cart.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutcontent:FormGroup;
  

  finalcart = [];
  totalprice = 0;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private afs:AngularFirestore,private router:Router) { }

  checkoutSession(checkoutDetails){

    if(this.checkoutcontent.valid  && this.checkoutcontent.get('email').valid){
    console.log(checkoutDetails);
    this.afs.collection('order').doc(checkoutDetails.fname+" "+checkoutDetails.mobile).set({
      name:checkoutDetails.fname + " "+ checkoutDetails.lname,
      address : checkoutDetails.address1 + " "+checkoutDetails.address2,
      city:checkoutDetails.city,
      postcode:checkoutDetails.postcode,
      phone:checkoutDetails.mobile,
      email:checkoutDetails.email,
      order:this.finalcart

    }).then(()=>{
      console.log('data successfully written.');
      this.router.navigate(['']);

    });
    console.log(this.checkoutcontent.valid);
    }
    
  }

  checknumber(control:FormControl):{ [s:string] : boolean } {
    if(control.value){
      var chars = control.value.toString().split('');
      console.log("Invalid number if ke andar");
      for(var i =0; i<chars.length;i++){
        console.log("Invalid number for ke andar");
        console.log(chars);
        if(chars[i] == '[a-z?]'){
          console.log("Invalid number for wale if ke andar");
          console.log("Invalid Class CheckNumber");
          return {'it_is_a_number':false};
        }
      }
    }
    return null;
  }

  checkmobile(control:FormControl):{ [s:string] : boolean } {
    
    // if(control.value){
    if(control.value&&control.value.toString().length != 10){
     
      //yaha pe invalid hai
      return {'invalidnumber':true};
    }
    
      return null;
    
      }

  


  ngOnInit() {
    this.checkoutcontent = new FormGroup({
      fname : new FormControl(null,Validators.required),
      lname : new FormControl(null,Validators.required),
      address1 : new FormControl(null,Validators.required),
      address2 : new FormControl(null),
      city : new FormControl(null,Validators.required),
      postcode : new FormControl(null,Validators.required),
      mobile : new FormControl(null,[Validators.required,this.checkmobile,this.checknumber]),
      email: new FormControl(null,[Validators.required,Validators.email])
    });
    // console.log("Hey i am in cart");
    this.finalcart=this.storage.get('cart');
      for(var i = 0; i<this.finalcart.length;i++){
        this.totalprice += (this.finalcart[i].price)*(this.finalcart[i].amount);
        console.log(this.totalprice);
      }
    console.log(this.finalcart);
    console.log("Hey i am in cart");
    // console.log(this.checkoutcontent)
console.log(this.checkmobile(new FormControl(861917248)));
  }

}