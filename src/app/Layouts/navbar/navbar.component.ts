import { AuthService } from './../../core/services/auth/auth.service';
import {
  AfterViewInit,
  Component,
  HostListener,
  inject,
  input,
  OnChanges,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWhishlist } from '../../shared/interfaces/whishlist/whishlist';
import { CartService } from '../../core/services/cart/cart.service';
import { isPlatformBrowser } from '@angular/common';
import { jwtDecode } from 'jwt-decode';

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
  isChecked: boolean = false;
  public wishlistService = inject(WishlistService);
  public cartService = inject(CartService);
  private readonly authService = inject(AuthService);
  private readonly platId = inject(PLATFORM_ID);
  @HostListener('window:scroll') onScroll() {
    if (scrollY > 0) {
      this.isScroll = true;
    } else {
      this.isScroll = false;
    }
  }
  userData: any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    if (isPlatformBrowser(this.platId)) {
      if (localStorage.getItem('token')) {
        this.userData = jwtDecode(localStorage.getItem('token')!);
      }
      // if (localStorage.getItem('token')) {
      //   this.cartService.numOfCart.subscribe({
      //     next: (num) => {
      //       this.cartNum = num;
      //     },
      //   });
      //   this.cartService.totalPrice.subscribe({
      //     next: (num) => {
      //       this.totalPrice = num;
      //     },
      //   });
      //   this.cartService.getCart().subscribe({
      //     next: (res) => {
      //       this.cartService.numOfCart.next(res.numOfCartItems);
      //       this.cartService.totalPrice.next(res.data.totalCartPrice);
      //     },
      //   });
      // }
      document.documentElement.classList.toggle(
        'dark',
        localStorage.getItem('color-theme') === 'dark' ||
          (!('color-theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
      );
      if (
        localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        this.isChecked = true;
      }
    }
  }

  changed(evt: any) {
    this.isChecked = evt.target.checked;
    if (this.isChecked) {
      localStorage.setItem('color-theme', 'dark');
    } else {
      localStorage.setItem('color-theme', 'light');
    }
    document.documentElement.classList.toggle(
      'dark',
      localStorage.getItem('color-theme') === 'dark' ||
        (!('color-theme' in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
    );
    console.log(this.userData);
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
