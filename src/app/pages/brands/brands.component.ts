import { BrandService } from './../../core/services/brand/brand.service';
// import { Component, inject, OnDestroy, OnInit } from '@angular/core';
// import { BrandService } from '../../core/services/brand/brand.service';
// import { IBrands } from '../../shared/interfaces/brands/brands';
// import { CarouselModule } from 'ngx-owl-carousel-o';

// import { OwlOptions } from 'ngx-owl-carousel-o';
// import { Subscription } from 'rxjs';
// import { Modal } from 'flowbite';
// import modal from 'flowbite/lib/esm/components/modal';
// @Component({
//   selector: 'app-brands',
//   imports: [CarouselModule],
//   templateUrl: './brands.component.html',
//   styleUrl: './brands.component.scss',
// })
// export class BrandsComponent implements OnInit, OnDestroy {
//   private readonly _BrandService = inject(BrandService);
//   brandData!: IBrands[];
//   spicbrandData!: IBrands;

//   customOptions: OwlOptions = {
//     loop: true,
//     mouseDrag: true,
//     touchDrag: true,
//     pullDrag: false,
//     dots: false,
//     navSpeed: 500,
//     autoplay: true,
//     autoplayTimeout: 2000,
//     // autoplayHoverPause: true,
//     autoplaySpeed: 1000,
//     navText: [
//       '<i class="fa-solid fa-arrow-left"></i>',
//       '<i class="fa-solid fa-arrow-right"></i>',
//     ],
//     responsive: {
//       0: {
//         items: 3,
//       },
//       400: {
//         items: 6,
//       },
//       740: {
//         items: 8,
//       },
//       940: {
//         items: 10,
//       },
//     },
//     //  navText
//     nav: false,
//     // nav: true,
//   };

//   getAllbrands() {
//     this.sub = this._BrandService.getAllBrands().subscribe({
//       next: (res) => {
//         console.log(res.data);
//         this.brandData = res.data;
//       },
//     });
//   }

//   getspecificbrands(id: string) {
//     this.sub = this._BrandService.getSpecificBrand(id).subscribe({
//       next: (res) => {
//         console.log(res.data);
//         this.spicbrandData = res.data;
//       },
//     });
//   }

//   ngOnInit(): void {
//     this.getAllbrands();
//   }

//   sub!: Subscription;
//   ngOnDestroy(): void {
//     //Called once, before the instance is destroyed.
//     //Add 'implements OnDestroy' to the class.
//     // console.log('dd');
//     this.sub.unsubscribe();
//   }
// }
import { CarouselModule } from 'ngx-owl-carousel-o';

import { Component, inject, OnInit } from '@angular/core';
import { IBrands } from '../../shared/interfaces/brands/brands';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-brands',
  imports: [CarouselModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private brandsService = inject(BrandService);

  brandData!: IBrands[];
  // Replace with actual interface if available
  showModal: boolean = false;
  selectedBrand: any = null;
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
  ngOnInit(): void {
    this.brandsService.getAllBrands().subscribe({
      next: (res) => {
        this.brandData = res.data;
      },
    });
  }
  getspecificbrands(BrandId: string) {
    this.brandsService.getSpecificBrand(BrandId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.selectedBrand = res.data;
      },
    });
  }
  openModal(brand: any) {
    this.getspecificbrands(brand);
    this.selectedBrand = brand;
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.selectedBrand = null;
  }
}
