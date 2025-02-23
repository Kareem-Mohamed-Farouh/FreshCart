import { Component, ElementRef, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoryService } from '../../core/services/Category/category.service';
import { ProductsService } from '../../core/services/products/products.service';
import { HomeSliderComponent } from '../../shared/components/homeSlider/home-slider/home-slider.component';
import { ICategory } from '../../shared/interfaces/icategories';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { IWhishlist } from '../../shared/interfaces/whishlist/whishlist';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { WishlistService } from './../../core/services/wishlist/wishlist.service';
@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    HomeSliderComponent,
    SearchPipe,
    FormsModule,
    RouterLink,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly wishlistService = inject(WishlistService);
  private readonly cartService = inject(CartService);
  private readonly elementRef = inject(ElementRef);
  private readonly toastr = inject(ToastrService);

  searchWord: string = '';
  isInWishlist: boolean = true;

  categoryData!: ICategory[];
  wishData!: IWhishlist[];
  products!: IProducts[];
  sub!: Subscription;

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
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 6,
      },
    },
    //  navText
    nav: false,
    // nav: true,
  };

  CardCustomOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 1000,
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 50,
    autoplaySpeed: 800,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    items: 1,
    nav: false, // أو يمكن تفعيلها إذا أردت أزرار التنقل
  };

  ngOnInit(): void {
    this.getproductData();
    this.getcategryData();
    this.getLogeduser();
  }

  getproductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
    });
  }
  getcategryData() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryData = res.data;
        console.log(res.data);
      },
    });
  }
  getLogeduser() {
    this.sub = this.wishlistService.getLoggedUserWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishlistService.wishCount.next(res.count);
        this.wishData = res.data;
      },
    });
  }

  addItemToCart(productId: string) {
    this.sub = this.cartService.addProductToCart(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.toastr.success(res.message, 'FreshCart!');
        this.cartService.cartCount.next(res.numOfCartItems);
      },
    });
  }

  addProductToWishList(idprod: string) {
    this.sub = this.wishlistService.addProductToWishlist(idprod).subscribe({
      next: (res) => {
        console.log(res);
        this.getLogeduser();
        this.toastr.success(res.message, 'FreshCart!');
        this.wishlistService.wishCount.next(res.count);
      },
    });
  }

  removProductFromWishlist(idprodd: string) {
    this.sub = this.wishlistService
      .RemoveProductFromWishlist(idprodd)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.getLogeduser();
          this.toastr.info(res.message, 'FreshCart');
          this.wishlistService.wishCount.next(res.count);
        },
      });
  }

  ngOnDestroy(): void {
    // console.log('');
    this.sub.unsubscribe();
  }
}
