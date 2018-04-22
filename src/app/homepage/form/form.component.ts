import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import   'firebase/firestore';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
// import $ from 'jquery';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit,OnDestroy {
dropdown_state=true;
  constructor(private router:Router) {
  
   }
  
  fetchBooks = new FormGroup({
    medium : new FormControl,
    board : new FormControl,
    class : new FormControl,
    school : new FormControl
  });

  fetchData(UserData){
    this.router.navigate([UserData.medium.toLowerCase(),UserData.board.toLowerCase(),UserData.class.split(' ')[1].toLowerCase()]);
  }
  
  




  ngOnInit() {
    var TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };
    
    TxtType.prototype.tick = function() {
      var i = this.loopNum % this.toRotate.length;
      var fullTxt = this.toRotate[i]; 
    
      if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
      }
    
      this.el.innerHTML = '<span class="wrap">'+'New '+this.txt+'</span>';
    
      var that = this;
      var delta = 200 - Math.random() * 100;
    
      if (this.isDeleting) { delta /= 2; }
    
      if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
      }
    
      setTimeout(function() {
      that.tick();
      }, delta);
    };
    
    window.onload = function() {
      var elements = document.getElementsByClassName('typewrite');
      for (var i=0; i<elements.length; i++) {
          var toRotate = elements[i].getAttribute('data-type');
          var period = elements[i].getAttribute('data-period');
          if (toRotate) {
            new TxtType(elements[i], JSON.parse(toRotate), period);
          }
      }
      // INJECT CSS
      var css = document.createElement("style");
      css.type = "text/css";
      css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
      document.body.appendChild(css);
    };

    // --------------------------------------------menu--------------------------------------------
// document.ready(function(){
//   $('#dropDown').click(function(){
//     $('.drop-down').toggleClass('drop-down--active');
//   });
// });

 
  }
ngOnDestroy(){
  this.fetchBooks.reset;
}



}