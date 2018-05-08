import { Component, OnInit,Inject } from '@angular/core';
import { AngularFirestore } from "angularfire2/firestore";
import { LOCAL_STORAGE, WebStorageService } from "angular-webstorage-service";

@Component({
  selector: 'app-orderdetails',
  templateUrl: './orderdetails.component.html',
  styleUrls: ['./orderdetails.component.css']
})
export class OrderdetailsComponent implements OnInit {

  clicked_item;
  order_total:number = 0;
  delivery_charge:number = 0;

  constructor(@Inject(LOCAL_STORAGE) private storage:WebStorageService, private afs:AngularFirestore) { }

  ngOnInit() {
    this.clicked_item = this.storage.get('clicked_item');
    console.log(this.storage.get('clicked_item'));
    for(var i = 0 ; i<this.clicked_item.order.length; i++){
      this.order_total += (this.clicked_item.order[i].amount)*(this.clicked_item.order[i].price);
    }
    console.log(this.order_total);
  }

}
