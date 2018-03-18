import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent implements OnInit {

  constructor(private authservice:AuthService) { }  

  signupForm = new FormGroup({
    email : new FormControl,
    password : new FormControl
  });

  signUp(userform){
    this.authservice.signup(userform.email,userform.password);
  }

  ngOnInit() {
  }

}
