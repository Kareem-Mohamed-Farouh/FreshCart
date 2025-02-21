import { AuthService } from './../../core/services/auth/auth.service';
import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  input,
  OnChanges,
  OnInit,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWhishlist } from '../../shared/interfaces/whishlist/whishlist';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin = input<boolean>(false);
  isScroll: Boolean = false;

  public wishlistService = inject(WishlistService);

  @HostListener('window:scroll') onScroll() {
    if (scrollY > 0) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  readonly authService = inject(AuthService);
  // // OR
  //  private readonly authService = inject(AuthService);
  // loguot() {
  //   this.authService.logoutUser();
  // }
}
