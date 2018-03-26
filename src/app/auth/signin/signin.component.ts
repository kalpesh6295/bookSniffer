import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import {AuthService} from '../auth.service';
import { Router } from "@angular/router";
import { CartService } from '../../cart.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice:AuthService,private route:Router,public cartService:CartService) { }

  public show = false;

  signinForm = new FormGroup({
    email : new FormControl,
    password : new FormControl
  });

  signIn(userform){
   this.authservice.signin(userform.email,userform.password);
    console.log("Done!");
  }

  forget(){
    this.route.navigate(['reset']);
  }

  ngOnInit() {
  }
  check_click(){
    console.log(this.cartService.main_container_click);
    console.log(this.cartService.wrapper_click);
    if(this.cartService.main_container_click&&!this.cartService.wrapper_click){
      this.cartService.sign_in_pop_up=false;
    }
    this.cartService.main_container_click=false;
    this.cartService.wrapper_click=false;

  }

}
