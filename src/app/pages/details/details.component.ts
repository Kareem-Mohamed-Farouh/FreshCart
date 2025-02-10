import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../core/services/Category/category.service';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productsService = inject(ProductsService);
  detailsId: string = '';
  d: number = 1;
  detailData: IProducts = {} as IProducts;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.activatedRoute.paramMap.subscribe({
      next: (res) => {
        this.detailsId = res.get('detailsId')!;

        this.productsService.getSpecificProduct(this.detailsId).subscribe({
          next: (res) => {
            this.detailData = res.data;
            this.d = Math.floor(this.detailData.ratingsAverage);
          },

          error: (err) => {
            console.log(err.error);
          },
        });
      },
    });
  }
}
