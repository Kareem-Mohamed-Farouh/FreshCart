import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/Category/category.service';
import { HomeComponent } from '../home/home.component';
import { ICategory } from '../../shared/interfaces/icategories';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-categories',
  imports: [RouterLink],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly productsService = inject(ProductsService);
  istrue: boolean = false;
  categoryData!: ICategory[];
  productData!: IProducts[];
  spicCategoryData!: ICategory;

  ngOnInit(): void {
    this.getCategory();
    this.getallproduct();
  }

  getCategory() {
    this.categoryService.getCategories().subscribe({
      next: (res) => {
        console.log(res.data);
        this.categoryData = res.data;
      },
    });
  }

  getallproduct() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        console.log(res.data);
        this.productData = res.data;
      },
    });
  }

  getspecificCategory(catId: string) {
    this.categoryService.getSpecificCategories(catId).subscribe({
      next: (res) => {
        console.log(res.data);
        this.spicCategoryData = res.data;
      },
    });
  }
}
