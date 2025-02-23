import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/Category/category.service';
import { HomeComponent } from '../home/home.component';
import { ICategory } from '../../shared/interfaces/icategories';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  imports: [RouterLink, ToastrModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  istrue: boolean = false;
  categoryData!: ICategory[];
  productData!: IProducts[];
  spicCategoryData!: ICategory;
  clickd: boolean = true;
  sub!: Subscription;

  ngOnInit(): void {
    this.getallproduct();
    this.getCategory();
  }

  getCategory() {
    this.sub = this.categoryService.getCategories().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.categoryData = res.data;
      },
    });
  }
  getallproduct() {
    this.sub = this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.productData = res.data;
      },
    });
  }

  addToCart(prodId: string): void {
    this.sub = this.cartService.addProductToCart(prodId).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          this.toastr.success(`${res.message}`, 'FreshCart');
        }
      },
    });
  }

  getspecificCategory(catId: string) {
    this.sub = this.categoryService.getSpecificCategories(catId).subscribe({
      next: (res) => {
        // console.log(res.data);
        this.clickd = false;
        this.spicCategoryData = res.data;
        this.toastr.success(`${res.message}`, 'FreshCart');
      },
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // console.log('dd');
    this.sub.unsubscribe();
  }
}
