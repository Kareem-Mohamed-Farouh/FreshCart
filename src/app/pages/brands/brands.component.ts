import { Component, inject, OnInit } from '@angular/core';
import { BrandService } from '../../core/services/brand/brand.service';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss',
})
export class BrandsComponent implements OnInit {
  private readonly _BrandService = inject(BrandService);
  brandData: any;

  getAllbrands() {
    this._BrandService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.brandData = res.data;
      },
    });
  }

  ngOnInit(): void {}
}
