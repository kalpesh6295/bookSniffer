import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable, Inject } from "@angular/core";
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
export interface userdetails {
    UserMail?: String,
    UserName?: String

}
@Injectable()
export class AuthService {

    smessage;
  signed_in;
  userdetails:userdetails;
  recovery_mail_send=false;
    constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService,private afs:AngularFirestore){}

    signin(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            () => {
                console.log("Successfully Logged In");
                this.signed_in=true;
                this.storage.set('user_signed_in',true);
                this.afs.collection('UserDetails').doc(email).valueChanges().subscribe(
                 userdetails =>{
                    this.userdetails = userdetails;
                 }
              
                )
                this.storage.set('userdetails',this.userdetails);
                
            }
        ).catch(
            () => {console.log("Cannot Log In! Please Regiseter!")}
        )
    }
    signup(userdata){
        firebase.auth().createUserWithEmailAndPassword(userdata.email,userdata.password).then(
            () =>  {
                this.afs.collection('UserDetails').doc(userdata.email).set({
                    UserMail : userdata.email,
                    UserName : userdata.username
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