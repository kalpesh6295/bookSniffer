import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  visible_header = true;

  fetchBooks = new FormGroup({
    medium : new FormControl,
    board : new FormControl,
    class : new FormControl,
    school : new FormControl
  });

  constructor(private router:Router,private route:ActivatedRoute) { }
  fetchData(UserData){
    this.router.navigate([UserData.medium.toLowerCase(),UserData.board.toLowerCase(),UserData.class.split(' ')[1].toLowerCase()]);
      }
          

  ngOnInit() {
    console.log(this.router.url);
    if(this.router.url === '/checkout'){
      this.visible_header = false;
    }
    else{
      this.visible_header = true;
    }
  }

}
