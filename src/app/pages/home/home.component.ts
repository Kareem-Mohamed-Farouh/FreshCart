import { Component, inject, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products/products.service';
import { log } from 'console';
import { ProductsComponent } from '../products/products.component';
import { IProducts } from '../../shared/interfaces/IProducts/iproducts';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private readonly productsService = inject(ProductsService);

  products!: IProducts[];
  getproductData() {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  ngOnInit(): void {
    // this.getProductData();
    this.getproductData();
  }
}
