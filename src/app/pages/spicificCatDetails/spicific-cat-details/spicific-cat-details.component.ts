import { ActivatedRoute, RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/Category/category.service';
import { ICategory } from '../../../shared/interfaces/icategories';

import { DatePipe } from '@angular/common';
import { ProductsService } from '../../../core/services/products/products.service';
import { IProducts } from '../../../shared/interfaces/IProducts/iproducts';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';
import { ChangerheartDirective } from '../../../shared/directives/changeHeart/changerheart.directive';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-spicific-cat-details',
  imports: [DatePipe, RouterLink, ChangerheartDirective],
  templateUrl: './spicific-cat-details.component.html',
  styleUrl: './spicific-cat-details.component.scss',
})
export class SpicificCatDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);
  private readonly productsService = inject(ProductsService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  productData!: IProducts[];

  idCategory!: string;

  categoryDataDetail: ICategory = {} as ICategory;
  // categoryDataDetail!: IProducts;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (para) => {
        para.get('detailsCatId');
        this.idCategory = para.get('detailsCatId')!;
        console.log(this.idCategory);

        this.categoryService.getSpecificCategories(this.idCategory).subscribe({
          next: (res) => {
            console.log(res.data);
            this.categoryDataDetail = res.data;
          },
        });
        this.productsService.getAllProducts().subscribe({
          next: (res) => {
            console.log(res);
            this.productData = res.data;
          },
        });
      },
    });
  }

  addProductToWishList(idprod: string) {
    this.wishlistService.addProductToWishlist(idprod).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart!');
        this.wishlistService.wishCount.next(res.data.length);
      },
    });
  }

  addItemToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart!');
        this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }

  sub!: Subscription;
  ngOnDestroy(): void {
    // console.log('');
    this.sub.unsubscribe();
  }
}
