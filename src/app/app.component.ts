import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  constructor(public cartservice:CartService, public authservice:AuthService){

  }
}
