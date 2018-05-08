import { Component, OnInit,Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {AngularFirestore} from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service'
import { CartService } from "../cart.service";

export interface userinfo {
  username?:string,
  usermail?:string,
  cart?:{amount?:number,description?:string,image?:string,name?:string,price?:number}[]
}

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {
cart=[];
mixcart=[];
items;
totalPrice=0;
userinfo:userinfo;
count=0;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private afs:AngularFirestore,private authservice:AuthService,private router: Router,private cartservice:CartService) { }

  ngOnInit() {  

    //old code below

    // this.cartservice.cart.subscribe((nextcart)=>{
      //   alert(nextcart);
      this.cart = this.storage.get('cart');
      firebase.auth().onAuthStateChanged(user => {
        this.cart = this.storage.get('cart');
        if(this.storage.get('user_signed_in')){
      this.afs.collection('UserDetails').doc(user.email).valueChanges()
      .subscribe(userinfo => {
          this.userinfo = userinfo;
          // this.username = this.userinfo.username;
          this.mixcart = this.userinfo.cart;
          console.log("login pe cart fetch hui jo hai"+this.mixcart);
          console.log(this.cart);
          console.log(this.storage.get('cart'));
           for(var i = 0; i<this.storage.get('cart').length;i++){   
              for(var j = 0;j<this.mixcart.length;j++){
                      console.log(" i description is"+this.storage.get('cart')[i].description);
                      console.log("j description is"+this.mixcart[j].description);
                      if(this.storage.get('cart')[i].description===this.mixcart[j].description){
                          console.log('ho lag gya ho lag gya');
                          this.mixcart[j].amount = 1;
                          // i++;
                          j=0;
                          this.count = 1;
                          break;
                      }
                      else{
                        console.log('nahi laga ho nahi laga!');
                          this.count = 0;
                          // continue;
                      }
                  }
                  if(this.count==0){
                      console.log('count zero h');
                      this.mixcart.push(this.storage.get('cart')[i]);
                      console.log(this.mixcart)
                  }
              }
              this.storage.set('cart',this.mixcart);
              this.cart = this.storage.get('cart');
              console.log('userinfo.cart hai'+this.mixcart);
            })
          }
          })
    //   console.log('the cart is'+nextcart)
    // })

    console.log(this.authservice.signed_in);
    // console.log(firebase.auth().currentUser.email);


    
    // this.cart=this.storage.get('cart');
    // console.log(this.cart);



    // this.items=this.cart.length;
    if(this.cart){
      for (var i=0; i < this.cart.length; i++) {
          this.totalPrice=this.totalPrice+this.cart[i].price*this.cart[i].amount;
        }
      }

  }
  itemUpdate(description,amount){
    for (var i=0; i < this.cart.length; i++) {

      if (this.cart[i].description === description) {
         this.cart[i].amount=this.cart[i].amount+amount;
         if(this.cart[i].amount==0){
          this.totalPrice=this.totalPrice-this.cart[i].price;
           this.cart.splice(i,1);
           this.items=this.cart.length;
           
         }
         else{
         this.totalPrice=this.totalPrice+amount*this.cart[i].price;
         }
         this.storage.set('cart',this.cart);
          break;
      }
      }
  
    
  }
  itemRemove(description){
    for (var i=0; i < this.cart.length; i++) {
      if (this.cart[i].description === description) {
        this.totalPrice=this.totalPrice-this.cart[i].amount*this.cart[i].price;
           this.cart.splice(i,1);
           this.items=this.cart.length;
         this.storage.set('cart',this.cart);
          break;
          
      }
      }
  }

  goToCheckout(){
    if(this.storage.get('user_signed_in')){
      this.router.navigate(['checkout'])
    }
    else{
      this.cartservice.sign_in_pop_up=true;
    }
  }

}
