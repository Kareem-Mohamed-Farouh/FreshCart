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
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  isLogin = input<boolean>(false);
  isScroll: Boolean = false;
  logoutt: Boolean = true;

  public wishlistService = inject(WishlistService);
  public cartService = inject(CartService);
  private readonly authService = inject(AuthService);

  @HostListener('window:scroll') onScroll() {
    if (scrollY > 0) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }

  dark() {
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    var themeToggleDarkIcon = document.getElementById(
      'theme-toggle-dark-icon'
    )!;
    var themeToggleLightIcon = document.getElementById(
      'theme-toggle-light-icon'
    )!;

    // Change the icons inside the button based on previous settings
    if (
      localStorage.getItem('color-theme') === 'dark' ||
      (!('color-theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      themeToggleLightIcon.classList.remove('hidden');
    } else {
      themeToggleDarkIcon.classList.remove('hidden');
    }

    var themeToggleBtn = document.getElementById('theme-toggle')!;

    themeToggleBtn.addEventListener('click', function () {
      // toggle icons inside button
      themeToggleDarkIcon.classList.toggle('hidden');
      themeToggleLightIcon.classList.toggle('hidden');

      // if set via local storage previously
      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }

        // if NOT set via local storage previously
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    });
  }

  // readonly authService = inject(AuthService);
  // // OR
  loguot() {
    this.logoutt = false;
  }
  sure() {
    this.authService.logoutUser();
  }
  cancel() {
    this.logoutt = true;
  }
}
