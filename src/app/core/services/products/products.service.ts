import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { IProducts } from '../../../shared/interfaces/IProducts/iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/products`);
  }

  getSpecificProduct(id: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/products/${id}`
      // `https://ecommerce.routemisr.com/api/v1/products/6428de2adc1175abc65ca05b`
    );
  }
  products!: IProducts[];
  getproductData() {
    this.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res.data);
        this.products = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
