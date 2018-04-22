<<<<<<< HEAD
import { Component, OnInit, Inject } from '@angular/core';
import * as firebase from 'firebase';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import {AuthService} from '../auth/auth.service';

export interface userdetails{
  usermail?:string,
  username?:string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userdetails:userdetails;
  loggedin_details:string;
  email:string;
  uname:string;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private afs:AngularFirestore,private router:Router,private authservice:AuthService) { }

  ngOnInit() {
    this.email = this.storage.get('currentemail');
    this.uname = this.storage.get('username');
    console.log(this.email);
    console.log(this.uname);

  //   this.afs.collection('UserDetails').doc(this.storage.get('currentemail')).valueChanges()
  //   .subscribe(userdetails => {
  //     this.userdetails = userdetails;
  //     console.log(this.userdetails);
  //   }
  // );


    // console.log(firebase.auth().currentUser);
    // this.loggedin_details = this.storage.get('loggedin_mail');
    // console.log(this.storage.get('loggedin_mail'));
    // this.afs.collection('UserDetails').doc(this.loggedin_details).valueChanges().subscribe(
    //   userdetails =>{
    //      this.userdetails = userdetails;
    //      console.log(this.userdetails);
    //   }
    // )

    // firebase.auth().onAuthStateChanged(user => {
      //     if(user) {
      //         this.email = user.email;
      //         this.afs.collection('UserDetails').doc(this.email).collection('order').valueChanges()
      //         .subscribe(orderdetail => {
      //         this.orderdetails = orderdetail;
      //           console.log(this.orderdetails);
      //           console.log(this.orderdetails)
      //       });
      //     }
      // });

      
  // firebase.auth().onAuthStateChanged(user => {
  //   if(user){
  //     console.log(this.authservice.email);
  //     this.afs.collection('UserDetails').doc(firebase.auth().currentUser.email).valueChanges()
  //     .subscribe(userdetails => {
  //         this.userdetails = userdetails;
  //         console.log(this.userdetails);
  //       }
  //     );
  //   }
  // })
  
  
}
=======
import { Component, OnInit, Inject } from '@angular/core';
import * as firebase from 'firebase';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Router } from "@angular/router";
import {AuthService} from '../auth/auth.service';

export interface userdetails{
  usermail?:string,
  username?:string
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userdetails:userdetails;
  loggedin_details:string;
  email:string;
  uname:string;

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private afs:AngularFirestore,private router:Router,private authservice:AuthService) { }

  ngOnInit() {
    this.email = this.storage.get('currentemail');
    this.uname = this.storage.get('username');
    console.log(this.email);
    console.log(this.uname);

  //   this.afs.collection('UserDetails').doc(this.storage.get('currentemail')).valueChanges()
  //   .subscribe(userdetails => {
  //     this.userdetails = userdetails;
  //     console.log(this.userdetails);
  //   }
  // );


    // console.log(firebase.auth().currentUser);
    // this.loggedin_details = this.storage.get('loggedin_mail');
    // console.log(this.storage.get('loggedin_mail'));
    // this.afs.collection('UserDetails').doc(this.loggedin_details).valueChanges().subscribe(
    //   userdetails =>{
    //      this.userdetails = userdetails;
    //      console.log(this.userdetails);
    //   }
    // )

    // firebase.auth().onAuthStateChanged(user => {
      //     if(user) {
      //         this.email = user.email;
      //         this.afs.collection('UserDetails').doc(this.email).collection('order').valueChanges()
      //         .subscribe(orderdetail => {
      //         this.orderdetails = orderdetail;
      //           console.log(this.orderdetails);
      //           console.log(this.orderdetails)
      //       });
      //     }
      // });

      
  // firebase.auth().onAuthStateChanged(user => {
  //   if(user){
  //     console.log(this.authservice.email);
  //     this.afs.collection('UserDetails').doc(firebase.auth().currentUser.email).valueChanges()
  //     .subscribe(userdetails => {
  //         this.userdetails = userdetails;
  //         console.log(this.userdetails);
  //       }
  //     );
  //   }
  // })
  
  
}
>>>>>>> e531e10626c49d52c471a9dfffb236bc07769d75
}