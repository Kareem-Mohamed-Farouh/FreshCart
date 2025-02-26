import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-home-slider',
  imports: [CarouselModule],
  templateUrl: './home-slider.component.html',
  styleUrl: './home-slider.component.scss',
})
export class HomeSliderComponent {
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 1000,
    dotsSpeed: 1000,
    autoplay: true,
    autoplayTimeout: 4000,
    // autoplayHoverPause: true,
    autoplaySpeed: 2000,
    navText: [
      '<i class="fa-solid fa-arrow-left"></i>',
      '<i class="fa-solid fa-arrow-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    //  navText
    nav: false,
    // nav: true,
  };

  slides: string[] = [
    // '/images/img1.avif',

    '/images/city.avif',
    '/images/ramadan.gif',
    '/images/fone.avif',
    '/images/ramadan2.avif',
    '/images/fashion.avif',
    '/images/eltro.avif',
    '/images/img5.avif',
    '/images/img6.avif',
    '/images/img7.avif',
  ];
}
