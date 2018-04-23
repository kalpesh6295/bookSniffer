import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable()
export class CartService {
cart=[];
Items=0;
sign_in_pop_up = false;
main_container_click=false;
wrapper_click=false;
  constructor() { 
   
  }

}
