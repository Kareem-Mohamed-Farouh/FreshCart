import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  myToken: string = localStorage.getItem('token')!;
  constructor(private readonly httpClient: HttpClient) {}

  addProductToCart(id: string): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/cart`,
      {
        productId: id,
      },

      { headers: { token: this.myToken } }
    );
  }

  GetLoggedUserCart(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/cart`, {
      headers: { token: this.myToken },
    });
  }

  removeSecificCartItem(id: string): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`, {
      headers: {
        token: this.myToken,
      },
    });
  }

  UpdateCartProductQuantity(idprod: string, count: number): Observable<any> {
    return this.httpClient.put(
      `${environment.baseUrl}/api/v1/cart/${idprod}`,
      {
        count: count,
      },

      {
        headers: {
          token: this.myToken,
        },
      }
    );
  }

  clearUserCart(): Observable<any> {
    return this.httpClient.delete(`${environment.baseUrl}/api/v1/cart`, {
      headers: {
        token: this.myToken,
      },
    });
  }
}
