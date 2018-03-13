import { Component, OnInit,Inject } from '@angular/core';
import {CartService} from '../cart.service';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
cart=[];
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private cartService:CartService,private router: Router) { }

  ngOnInit() {
    this.cart=this.cartService.cart;
    console.log("in cart component")
    console.log(this.cartService.cart);
    this.cart=this.storage.get('cart');
    console.log(this.cart);
  }

  goToCheckout(){
    this.router.navigate(['checkout'])
  }

}
