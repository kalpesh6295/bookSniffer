import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable, Inject } from "@angular/core";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { Router } from "@angular/router";
export interface userinfo {
    username?:string,
    usermail?:string,
    cart?:{amount?:number,description?:string,image?:string,name?:string,price?:number}[]
}
export interface orderdetail{
    address?:string,
    city?:string,
    date?:Date,
    email?:string,
    name?:string,
    order?:{amout?:number,description?:string,image?:string,name?:string,price?:number}[],
    phone?:number,
    postcode?:number
}
@Injectable()
export class AuthService {
userinfo:userinfo;
orderdetails:orderdetail[];
email;
username;
cart=[];
smessage;
signed_in;
count=0;
  recovery_mail_send=false;
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private router : Router,private afs:AngularFirestore){}

    signin(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            () => {
                console.log("Successfully Logged In");
                this.signed_in=true;
                this.storage.set('user_signed_in',true);
                this.storage.set('current_user',email)
              console.log('checking email'+this.storage.get('current_user'))
                // firebase.auth().onAuthStateChanged(user => {
                //     if(user) {
                //         this.email = user.email;
                //         console.log("login kia hai"+this.email);
                //         this.storage.set('currentemail',this.email);
                //         this.afs.collection('UserDetails').doc(this.email).valueChanges()
                //         .subscribe(userinfo => {
                //             this.userinfo = userinfo;
                //             this.username = this.userinfo.username;
                //             this.cart = this.userinfo.cart;
                //             console.log("login pe cart fetch hui jo hai"+this.cart);
                //             console.log(this.cart);
                //             console.log(this.storage.get('cart'));
                //              for(var i = 0; i<this.storage.get('cart').length;i++){  
                //                 for(var j = 0;j<this.cart.length;j++){
                //                         console.log(" i description is"+this.storage.get('cart')[i].description);
                //                         console.log("j description is"+this.cart[j].description);
                //                         if(this.storage.get('cart')[i].description===this.cart[j].description){
                //                             console.log('ho lag gya ho lag gya');
                //                             this.cart[j].amount = 1;
                //                             // i++;
                //                             j=0;
                //                             this.count = 1;
                //                             break;
                //                         }
                //                         else{
                //                             console.log('nahi laga ho nahi laga!');
                //                             this.count = 0;
                //                             continue;
                //                         }
                //                     }
                //                     if(this.count=0){
                //                         this.cart.push(this.storage.get('cart')[i]);
                //                     }
                //                 }
                //             console.log('userinfo hai'+this.userinfo);
                //             this.storage.set('username',this.username);
                //             this.storage.set('cart',this.cart);
                //         });
                //         this.afs.collection('UserDetails').doc(this.email).collection('order').valueChanges()
                //         .subscribe(orderdetail => {
                //         this.orderdetails = orderdetail;
                //           console.log("orders are"+this.orderdetails);
                //           this.storage.set('myorders',this.orderdetails);
                //       });
                //     }
                // });

            }
        ).catch(
            () => {console.log("Cannot Log In! Please Regiseter!")}
        )
        console.log(this.storage.get('cart'));
    }
    signup(email:string,password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            () =>  {
                this.afs.collection('UserDetails').doc(email).set({
                    UserMail : email,
                    UserPassword : password
                })
                console.log("You are now registered as a User.");
                this.signed_in=true;   
                this.storage.set('user_signed_in',true);
            }
        ).catch(
            ()=> {
                console.log("Cannot Sign You Up!");
            }
        )
    }
    forgetpassword(email:string){
        firebase.auth().sendPasswordResetEmail(email).then(
            ()=>{
                this.smessage = true;
                this.signed_in=false;
                this.storage.set('user_signed_in',false);
                this.recovery_mail_send=true;
                console.log("service s msg"+this.smessage);
                console.log("Check Your Email for Password Resetting mail.");
            }
        ).catch(
            ()=>{
                this.smessage = false;
                console.log("service f msg"+this.smessage);
                console.log("Cannot Send Verification Mail to Your E-Mail Account.");
            }
        )
    }
    logout(){
        firebase.auth().signOut().then( 
            ()=> {
                // console.log(this.afs.collection('UserDetails').doc(this.storage.get('currentemail')));
                // console.log('logged out email is'+this.storage.get('currentemail'));
                // console.log('inside signout auth function');
                this.signed_in=false;
                // console.log("log out k time ka email"+this.email);
                console.log(this.storage.get('currentemail'));
                this.afs.collection('UserDetails').doc(this.storage.get('current_user')).update({
                    cart : this.storage.get('cart')
                });
                this.storage.set('user_signed_in',false);
                console.log("Sign-out successful");
                this.storage.set('cart',[]);
                console.log("cart is "+this.storage.get('cart'));
            }, 
        ).catch(
            ()=>{
                console.log('Error signing out');
            }
        );
    }
  
}