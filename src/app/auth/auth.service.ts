import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {

    smessage;

    constructor(private afs:AngularFirestore){}

    signin(email:string,password:string){
        firebase.auth().signInWithEmailAndPassword(email,password).then(
            () => {
                console.log("Successfully Logged In");
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
}