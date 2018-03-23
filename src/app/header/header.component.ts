import { Component, OnInit,OnDestroy,Inject } from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import {CartService} from '../cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit ,OnDestroy {
  
  visible_header = true;
  items:number;
// items=;
  fetchBooks = new FormGroup({
    medium : new FormControl,
    board : new FormControl,
    class : new FormControl,
    school : new FormControl
  });
  sliderForm="slider_hidden";
  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router:Router,public cartService:CartService) {

   }
  fetchData(UserData){
    this.router.navigate([UserData.medium.toLowerCase(),UserData.board.toLowerCase(),UserData.class.split(' ')[1].toLowerCase()]);
      }
          
  showForm(){
    this.sliderForm="slider_visible";
  }

  ngOnInit() {
    
    console.log(this.cartService.Items);

 
    if(this.router.url === '/checkout'){
      this.visible_header = false;
    }
    else{
      this.visible_header = true;
    }
  }

  ngOnDestroy(){
    this.fetchBooks.reset;
  }

}
