import { Injectable, Inject } from '@angular/core';
import { Subject } from 'rxjs';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { AuthService } from "./auth/auth.service";
import { Router } from "@angular/router";
@Injectable()
export class CartService {
cart = new Subject() ;
Items=0;
sign_in_pop_up = false;
main_container_click=false;
wrapper_click=false;
constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private authservice:AuthService,private router: Router) {}
  
// get thecart(){
//   return this.storage.get('cart');
//   }
}
