import { AuthService } from './../../core/services/auth/auth.service';
import { Component, HostListener, inject, input } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin = input<boolean>(false);
  isScroll: Boolean = false;

  @HostListener('window:scroll') onScroll() {
    if (scrollY > 0) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  readonly authService = inject(AuthService);
  // OR
  //  private readonly authService = inject(AuthService);
  // loguot() {
  //   this.authService.logoutUser();
  // }
}
