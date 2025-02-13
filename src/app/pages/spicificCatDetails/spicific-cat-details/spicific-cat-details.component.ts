import { ActivatedRoute } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../../core/services/Category/category.service';
import { ICategory } from '../../../shared/interfaces/icategories';
import { IProducts } from '../../../shared/interfaces/IProducts/iproducts';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-spicific-cat-details',
  imports: [DatePipe],
  templateUrl: './spicific-cat-details.component.html',
  styleUrl: './spicific-cat-details.component.scss',
})
export class SpicificCatDetailsComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly categoryService = inject(CategoryService);

  idCategory!: string;
  categoryDataDetail: ICategory = {} as ICategory;
  // categoryDataDetail!: IProducts;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (para) => {
        para.get('detailsCatId');
        this.idCategory = para.get('detailsCatId')!;

        this.categoryService.getSpecificCategories(this.idCategory).subscribe({
          next: (res) => {
            console.log(res.data);
            this.categoryDataDetail = res.data;
          },
        });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
