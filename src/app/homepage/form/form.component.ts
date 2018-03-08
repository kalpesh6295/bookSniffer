import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import   'firebase/firestore';
import * as firebase from 'firebase';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
    
  constructor() { }
  
  fetchBooks = new FormGroup({
    medium : new FormControl,
    board : new FormControl,
    class : new FormControl,
    school : new FormControl
  });

  fetchData(UserData){
    console.log(UserData);
   var db = firebase.firestore();

  var docRef = db.collection(UserData.medium).doc(UserData.board).collection(UserData.class);

//   db.collection(UserData.medium.doc(UserData.board.doc(UserData.class).get().then((querySnapshot) => {
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data[0].hindi)
//     });
// });

docRef.get().then(function(querySnapshot) {
  querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
  });
});


  }
  
  




  ngOnInit() {
  }


}
