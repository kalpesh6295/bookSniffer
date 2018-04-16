import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable, Inject } from "@angular/core";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
export interface userinfo{
    username?:string,
    usermail?:string
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
smessage;
signed_in;
  recovery_mail_send=false;
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private afs:AngularFirestore){}

    signin(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            () => {
                console.log("Successfully Logged In");
                this.signed_in=true;
                this.storage.set('user_signed_in',true);

                firebase.auth().onAuthStateChanged(user => {
                    if(user) {
                        this.email = user.email;
                        console.log(this.email);
                        this.storage.set('currentemail',this.email);
                        this.afs.collection('UserDetails').doc(this.email).valueChanges()
                        .subscribe(userinfo => {
                            this.userinfo = userinfo;
                            this.username = this.userinfo.username;
                            console.log('userinfo hai',this.userinfo);
                            this.storage.set('username',this.username);
                        });
                        this.afs.collection('UserDetails').doc(this.email).collection('order').valueChanges()
                        .subscribe(orderdetail => {
                        this.orderdetails = orderdetail;
                          console.log(this.orderdetails);
                          this.storage.set('myorders',this.orderdetails);
                      });
                    }
                });

            }
        ).catch(
            () => {console.log("Cannot Log In! Please Regiseter!")}
        )
    }
    signup(email:string,password:string){
        firebase.auth().createUserWithEmailAndPassword(email,password).then(
            () =>  {
                this.afs.collection('UserDetails').doc(email+" "+password).set({
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
        this.signed_in=false;
    }
  
}