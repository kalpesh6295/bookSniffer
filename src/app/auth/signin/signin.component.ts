import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import {AuthService} from '../auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authservice:AuthService,private route:Router) { }

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

}
