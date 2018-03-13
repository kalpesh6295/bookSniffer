import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import   'firebase/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  constructor(private router:Router) { }
  
  fetchBooks = new FormGroup({
    medium : new FormControl,
    board : new FormControl,
    class : new FormControl,
    school : new FormControl
  });

  fetchData(UserData){
this.router.navigate([UserData.medium,UserData.board,UserData.class]);
  }
  
  




  ngOnInit() {
  }


}
