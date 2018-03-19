import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup,FormControl } from "@angular/forms";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  success ;
  failure ;


  forgetpassForm = new FormGroup({
    email : new FormControl
  });

  @ViewChild("emailvalue") el:HTMLInputElement

  constructor(private authservice:AuthService) { }

  ngOnInit() {
    // this.success = this.authservice.smessage;
    // console.log("Yes"+this.success);
    // this.failure = this.authservice.fmessage;
    // console.log("No"+this.failure);
  }

  forgetpass(f){
    // console.log(f.email);
    this.authservice.forgetpassword(f.email);
    this.forgetpassForm.get('email').setValue("");
    
  }

}
