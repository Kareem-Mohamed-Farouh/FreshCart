import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { IWhishlist } from '../../shared/interfaces/whishlist/whishlist';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  imports: [ToastrModule, RouterLink],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  products!: IProducts[];
  wishData!: IWhishlist[];

  ngOnInit(): void {
    this.getproductData();
    this.getLogged();
  }

  getproductData(): void {
    this.sub = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
    });
  }

  getproductData2(): void {
    this.sub = this.productsService.getAllProducts2().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
    });
  }

  addToCart(prodId: string): void {
    this.sub = this.cartService.addProductToCart(prodId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.cartService.cartCount.next(res.numOfCartItems);
          this.toastr.success(`${res.message}`, 'FreshCart');
        }
      },
    });
  }

  getLogged() {
    this.sub = this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.wishData = res.data;
      },
    });
  }

  addProductToWishlist(idProd: string) {
    this.sub = this.wishlistService.addProductToWishlist(idProd).subscribe({
      next: (res) => {
        console.log(res);
        this.getLogged();
        this.toastr.success(res.message, 'FreshCart');
        this.wishlistService.wishCount.next(res.data.length);
      },
    });
  }

  RemoveProductFromWishlist(idProd: string) {
    this.sub = this.wishlistService
      .RemoveProductFromWishlist(idProd)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getLogged();
          this.toastr.error(res.message, 'FreshCart');
          this.wishlistService.wishCount.next(res.data.length);
        },
      });
  }
  sub!: Subscription;
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // console.log('dd');
    this.sub.unsubscribe();
  }
}
