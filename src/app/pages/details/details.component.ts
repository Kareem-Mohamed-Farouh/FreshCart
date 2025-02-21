import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CategoryService } from '../../core/services/Category/category.service';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { CurrencyPipe } from '@angular/common';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-details',
  imports: [CurrencyPipe, CarouselModule, RouterLink],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly toastr = inject(ToastrService);
  detailsId: string = '';
  d: number = 1;
  detailData: IProducts = {} as IProducts;
  productData!: IProducts[];
  // detailData: IProducts | null = null;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 800,
    autoplay: true,
    autoplayTimeout: 3000,
    // autoplayHoverPause: true,
    autoplaySpeed: 700,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],

    items: 1,

    //  navText
    nav: false,
    // nav: true,
  };

  ngOnInit(): void {
    this.getDetails();
    this.getProductData();
  }

  getDetails() {
    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.detailsId = res.get('detailsId')!;
        this.productsService.getSpecificProduct(this.detailsId).subscribe({
          next: (res) => {
            console.log('details', res.data);

            this.detailData = res.data;
          },
        });
      },
    });
  }

  addItemToCart(productId: string) {
    this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart!');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProductToWishlist(idprodd: string) {
    this.wishlistService.addProductToWishlist(idprodd).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart');
      },
    });
  }

  getProductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.productData = res.data;
      },
    });
  }
}
