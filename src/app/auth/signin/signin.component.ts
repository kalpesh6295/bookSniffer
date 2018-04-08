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
signin_show=true;
signup_show = false;
recover_show = false;
  signInForm = new FormGroup({
    email : new FormControl,
    password : new FormControl
  });
ShowSignup(){
  this.signin_show=false;
  this.signup_show=true;
  this.recover_show=false;
}
ShowSignin(){
  this.signin_show=true;
  this.signup_show=false;
  this.recover_show=false;
}
ShowRecover(){
  this.signin_show=false;
  this.signup_show=false;
  this.recover_show=true;
}

  signin(userform){
   this.authservice.signin(userform.email,userform.password);
    console.log("Done!");
  }
  signUpForm = new FormGroup({
    email : new FormControl,
    password : new FormControl,
    username: new FormControl
  });

  signup(userform){
   this.authservice.signup(userform.email,userform.password);
    console.log("Done!");
  }
  recoverForm = new FormGroup({
    email : new FormControl,
   
  });

  recover(userform){
   this.authservice.forgetpassword(userform.email);
    console.log("Done!");
  }

  
  ngOnInit() {
    // $(".message a.signIn,.message a.createAccount").on("click", function() {
    //   $(".register-form,.login-form").animate(
    //     {
    //       height: "toggle",
    //       opacity: "toggle"
    //     },
    //     "slow"
    //   );
    // });
    // $(".reoverPassword,.backToLogin").on("click", function() {
    //   $(".reset-form,.login-form").animate(
    //     {
    //       height: "toggle",
    //       opacity: "toggle"
    //     },
    //     "slow"
    //   );
    // });
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
