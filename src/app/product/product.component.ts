import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import   'firebase/firestore';
import * as firebase from 'firebase';
import {CartService} from '../cart.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

export interface subject{
  description?:String,
  name?:String,
  price?:String
}
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 url;
 list;
 subjects:subject[] 
subjectData:Observable<subject[]>;
//  subjects:subject[];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private cartService:CartService,public afs: AngularFirestore,private router: Router) { }



  /*-------------++++++++++++++++++++++++++++++=----------------------++++++++++++++++++++++++++++++++++--------------*/
//  add to cart method 
// cart=[];
  addToCart(name:string,price:number){
var found=0;
for (var i=0; i < this.cartService.cart.length; i++) {

  if (this.cartService.cart[i].name === name) {
     this.cartService.cart[i].amount=this.cartService.cart[i].amount+1;
     this.storage.set('cart',this.cartService.cart);
     found=1;
      break;
  }
  }
if(found==0){
  this.cartService.cart.push({name,price,amount:1});
  this.storage.set('cart',this.cartService.cart);
}
console.log(this.cartService.cart);
}

buyNow(name,price){
  this.addToCart(name,price);
  this.router.navigate(['cart'])
}

/*-------------++++++++++++++++++++++++++++++=----------------------++++++++++++++++++++++++++++++++++--------------*/


  ngOnInit() {
    this.cartService.cart=this.storage.get('cart');
  this.url = this.router.url;
    this.list= this.url.split('/');
    console.log(this.list)
this.afs.collection(this.list[1]).doc(this.list[2]).collection(this.list[3]).valueChanges()
  .subscribe(subject => {
  this.subjects=subject;
  })
  }
}
