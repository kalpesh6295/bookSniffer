import { Component, OnInit,Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart=[];
items;
totalPrice=0;
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router: Router) { }

  ngOnInit() {
    
    this.cart=this.storage.get('cart');
    this.items=this.cart.length;
    for (var i=0; i < this.cart.length; i++) {
        this.totalPrice=this.totalPrice+this.cart[i].price*this.cart[i].amount;
      }
  }
  itemUpdate(name,amount){
    for (var i=0; i < this.cart.length; i++) {

      if (this.cart[i].name === name) {
         this.cart[i].amount=this.cart[i].amount+amount;
         if(this.cart[i].amount==0){
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
  itemRemove(name){
    for (var i=0; i < this.cart.length; i++) {
      if (this.cart[i].name === name) {
           this.cart.splice(i,1);
           this.items=this.cart.length;
         this.storage.set('cart',this.cart);
          break;
          
      }
      }
  }

  goToCheckout(){
    this.router.navigate(['checkout'])
  }

}
