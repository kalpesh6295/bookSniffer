import { Component, OnInit, Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

export interface subject{
  description?:String,
  name?:String,
  price?:Number,
  image?:String
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
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,public afs: AngularFirestore,private router: Router) { }



  /*-------------++++++++++++++++++++++++++++++=----------------------++++++++++++++++++++++++++++++++++--------------*/
//  add to cart method 
 cart=[];
  addToCart(name,description,image,price){
var found=0;
for (var i=0; i < this.cart.length; i++) {

  if (this.cart[i].description === description) {
     this.cart[i].amount=this.cart[i].amount+1;
     this.storage.set('cart',this.cart);
     found=1;
      break;
  }
  }
if(found==0){
  this.cart.push({name:name,description:description,image:image,price:price,amount:1});
  this.storage.set('cart',this.cart);
}
console.log(this.cart);
}

buyNow(name,description,image,price){
  this.addToCart(name,description,image,price);
  this.afs.collection('order').doc('abhijeet sawant').set({
    name:'abhijeet',
    cart:this.cart

  }).then(()=>{
    console.log('hip hip hurray')
  })
  
  this.router.navigate(['cart'])
}

/*-------------++++++++++++++++++++++++++++++=----------------------++++++++++++++++++++++++++++++++++--------------*/


  ngOnInit() {
    this.storage.set('cart',[]);
    this.cart=this.storage.get('cart');
  this.url = this.router.url;
    this.list= this.url.split('/');
    console.log(this.list)
this.afs.collection(this.list[1].toLowerCase()).doc(this.list[2].toLowerCase()).collection(this.list[3].toLowerCase()).valueChanges()
  .subscribe(subject => {
  this.subjects=subject;
  });
}
}
