import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/ICart/icart';
import { Subscription, takeUntil } from 'rxjs';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink, SweetAlert2Module],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly cartService: CartService = inject(CartService);
  private readonly router: Router = inject(Router);
  cartData!: ICart;
  sub!: Subscription;

  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.sub = this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.cartData = res.data;
      },
    });
  }

  removeProduct(id: string) {
    this.sub = this.cartService.removeSecificCartItem(id).subscribe({
      next: (res) => {
        // console.log(res.data);
        // this.getCartData(); xxxxx
        this.cartData = res.data; //   ////
        this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }

  updateCartProductQuantity(id: string, newCount: number) {
    this.sub = this.cartService
      .UpdateCartProductQuantity(id, newCount)
      .subscribe({
        next: (res) => {
          // console.log(res.data);
          this.cartData = res.data;
          this.cartService.cartCount.next(res.numOfCartItems);
        },
      });
  }

  deleteCart() {
    this.sub = this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res.message === 'success') {
          this.cartData = {} as ICart;
          this.getCartData();
          this.cartService.cartCount.next(res.numOfCartItems);
          // this.router.navigate(['/home']);
        }
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    console.log('dd');
    this.sub.unsubscribe();
  }
}
