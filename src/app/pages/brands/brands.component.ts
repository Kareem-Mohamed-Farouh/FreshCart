import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';
import { IBrands } from '../../shared/interfaces/brands/brands';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-brands',
  imports: [CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit, OnDestroy {
  private readonly _BrandService = inject(BrandService);
  brandData!: IBrands[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 500,
    autoplay: true,
    autoplayTimeout: 2000,
    // autoplayHoverPause: true,
    autoplaySpeed: 1000,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 3,
      },
      400: {
        items: 6,
      },
      740: {
        items: 8,
      },
      940: {
        items: 10,
      },
    },
    //  navText
    nav: false,
    // nav: true,
  };

  getAllbrands() {
    this.sub = this._BrandService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandData = res.data;
      },
    });
  }

  ngOnInit(): void {
    this.getAllbrands();
  }
  sub!: Subscription;
  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // console.log('dd');
    this.sub.unsubscribe();
  }
}
