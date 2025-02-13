import { CurrencyPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/ICart/icart';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private readonly cartService: CartService = inject(CartService);
  private readonly router: Router = inject(Router);
  cartData!: ICart;
  ngOnInit(): void {
    this.getCartData();
  }

  getCartData() {
    this.cartService.GetLoggedUserCart().subscribe({
      next: (res) => {
        console.log(res.data);

        this.cartData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeProduct(id: string) {
    this.cartService.removeSecificCartItem(id).subscribe({
      next: (res) => {
        console.log(res.data);
        // this.getCartData(); xxxxx
        this.cartData = res.data; //   ////
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  updateCartProductQuantity(id: string, newCount: number) {
    this.cartService.UpdateCartProductQuantity(id, newCount).subscribe({
      next: (res) => {
        console.log(res.data);
        this.cartData = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  deleteCart() {
    this.cartService.clearUserCart().subscribe({
      next: (res) => {
        console.log(res);
        if (res === 'success') {
          this.cartData = {} as ICart;
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
