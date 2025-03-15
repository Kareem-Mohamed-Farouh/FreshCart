import { CategoryService } from './../../../core/services/Category/category.service';
import { WishlistService } from './../../../core/services/wishlist/wishlist.service';

import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ProductsService } from '../../../core/services/products/products.service';

import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { IProducts } from '../../../shared/interfaces/IProducts/iproducts';

import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { CartService } from '../../../core/services/cart/cart.service';
import { HomeSliderComponent } from '../../../shared/components/homeSlider/home-slider/home-slider.component';
import { ICategory } from '../../../shared/interfaces/icategories';
import { IWhishlist } from '../../../shared/interfaces/whishlist/whishlist';
import { SearchPipe } from '../../../shared/pipes/search/search.pipe';
@Component({
  selector: 'app-homelogin',
  imports: [CarouselModule, HomeSliderComponent, SearchPipe, FormsModule],
  templateUrl: './homelogin.component.html',
  styleUrl: './homelogin.component.scss',
})
export class HomeloginComponent implements OnInit, OnDestroy {
  private readonly productsService = inject(ProductsService);
  private readonly categoryService = inject(CategoryService);
  private readonly wishlistService = inject(WishlistService);
  toastr = inject(ToastrService);

  isInWishlist: boolean = true;
  categoryData!: ICategory[];
  products!: IProducts[];
  wishData!: IWhishlist[];
  searchWord: string = '';
  subscribtion!: Subscription;

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
    // this.getLogeduser();
  }

  getproductData() {
    this.subscribtion = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
    });
  }

  getcategryData() {
    this.subscribtion = this.categoryService.getCategories().subscribe({
      next: (res) => {
        this.categoryData = res.data;
        console.log(res.data);
      },
    });
  }

  getloginMessage(message: string) {
    this.toastr.info(`you Must login to ${message}`, 'FreshCart!');
  }

  ngOnDestroy(): void {
    this.subscribtion.unsubscribe();
  }
}
