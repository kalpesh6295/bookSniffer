import { Component, OnInit, Inject } from '@angular/core';
import { WebStorageService, LOCAL_STORAGE } from "angular-webstorage-service";
import { AngularFirestore } from "angularfire2/firestore";
import { Router } from "@angular/router";
import * as firebase from 'firebase';

export interface orderdetail{
  address?:string,
  city?:string,
  date?:Date,
  email?:string,
  name?:string,
  order?:{amout?:number,description?:string,image?:string,name?:string,price?:number}[],
  phone?:number,
  postcode?:number
}

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  
  myorders;
  
   orderdetails:orderdetail[];
  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private afs:AngularFirestore,private router:Router) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(user => {
      if(user){
    console.log(this.storage.get('current_user'));
          this.afs.collection('UserDetails').doc(user.email).collection('order').valueChanges()
          .subscribe(orderdetail => {
          this.myorders = orderdetail;
            console.log(this.myorders);
        });
      }
      });
      
    }

  viewDetails(item_no:number){
    this.storage.set('clicked_item',this.myorders[item_no]);
    this.router.navigate(['orderdetails']);
  }

}
