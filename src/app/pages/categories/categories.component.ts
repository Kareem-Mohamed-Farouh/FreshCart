import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../core/services/Category/category.service';
import { HomeComponent } from '../home/home.component';
import { ICategory, ISubCategory } from '../../shared/interfaces/icategories';
import { ProductsService } from '../../core/services/products/products.service';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SubcategoriesService } from '../../core/services/subCategories/subcategories.service';
import { Modal } from 'flowbite';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-categories',
  imports: [ToastrModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent implements OnInit {
  private readonly categoryService = inject(CategoryService);
  private readonly SubcategoriesService = inject(SubcategoriesService);
  private readonly productsService = inject(ProductsService);
  private readonly cartService = inject(CartService);
  private readonly toastr = inject(ToastrService);
  istrue: boolean = false;
  categoryData!: ICategory[];
  productData!: IProducts[];
  spicCategoryData: ICategory = {} as ICategory;
  AllspicCategoryData!: ISubCategory[];
  idCategory!: string;
  showModal: boolean = false;
  sub!: Subscription;
  numberofSubCat!: number;
  ngOnInit(): void {
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

  getspecificCategory(catId: string) {
    this.sub = this.categoryService.getSpecificCategories(catId).subscribe({
      next: (res) => {
        console.log(res);
        this.spicCategoryData = res.data;

        // this.getAllSubCategoriesOfCategory(this.idCategory);
        // this.toastr.success(`${res.message}`, 'FreshCart');
      },
    });
  }

  getAllSubCatOnSpecCat(idCategory: string) {
    this.showModal = true;
    this.getspecificCategory(idCategory);
    this.sub = this.SubcategoriesService.getALLSubcategoryOnSpecific(
      idCategory
    ).subscribe({
      next: (res) => {
        console.log(res);
        this.numberofSubCat = res.results;
        this.AllspicCategoryData = res.data;
        // res.results;
      },
    });
  }

  getAllSubCategoriesOfCategory() {
    this.sub = this.SubcategoriesService.getAllSubcategory().subscribe({
      next: (res) => {
        this.showModal = true;
        console.log(res);
        this.AllspicCategoryData = res.data;
        this.numberofSubCat = res.results;
        // res.results;
      },
    });
  }

  closeModal() {
    this.showModal = false;
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    // console.log('dd');
    this.sub.unsubscribe();
  }
}
