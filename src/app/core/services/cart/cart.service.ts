import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // myToken: string = localStorage.getItem('token')!;

  cartCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  myToken: string = localStorage.getItem('token') || ' ';
  constructor(private readonly httpClient: HttpClient) {
    if (this.myToken !== null) {
      this.GetLoggedUserCart().subscribe({
        next: (res) => {
          this.cartCount.next(res.numOfCartItems);
        },
      });
    }
  }

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/cart`, {
      productId: id,
    });
  }

  GetLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`);
  }

  removeSecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`);
  }

  UpdateCartProductQuantity(idprod: string, count: number): Observable<any> {
    return this.httpClient.put(`${environment.baseUrl}/api/v1/cart/${idprod}`, {
      count: count,
    });
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`);
  }
}
