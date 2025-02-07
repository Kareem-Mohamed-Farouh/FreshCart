import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-auth-layaout',
  imports: [RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './auth-layaout.component.html',
  styleUrl: './auth-layaout.component.scss',
})
export class AuthLayaoutComponent {}
