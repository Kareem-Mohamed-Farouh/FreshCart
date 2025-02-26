import { IProducts } from './../../../shared/interfaces/IProducts/iproducts';
import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { CurrencyPipe } from '@angular/common';
import {
  IWhishlist,
  IWishstatues,
} from '../../../shared/interfaces/whishlist/whishlist';
import { CartService } from '../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-wishlist',
  imports: [CurrencyPipe, CarouselModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit {
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  res: IWishstatues = {} as IWishstatues;

  wishlistData!: IWhishlist[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    rtl: true,
    navSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    autoplaySpeed: 2000,
    navText: [
      '   <i class=" dark:text-green-700 ms-auto fa-solid fa-arrow-right"></i> ',
      '<i class="  dark:text-green-700  me-auto fa-solid fa-arrow-left">',
    ],

    items: 1,
    //  navText
    nav: false,
    // nav: true,
  };

  ngOnInit(): void {
    this.getwishlistData();
  }

  getwishlistData() {
    this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        // console.log(res);
        this.res = res;
        this.wishlistData = res.data;
        this.wishlistService.wishCount.next(res.count);
      },
    });
  }

  addItemToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.success(res.message, 'FreshCart!');
        this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }

  removProductFromWishlist(idprodd: string) {
    this.wishlistService.RemoveProductFromWishlist(idprodd).subscribe({
      next: (res) => {
        // console.log(res);
        this.toastr.info(res.message, 'FreshCart');
        this.getwishlistData();
        this.wishlistService.wishCount.next(res.count);
      },
    });
  }
}
