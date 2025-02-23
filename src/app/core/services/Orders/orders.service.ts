import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllOrders(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/orders/`);
  }

  getUserOrders(UserId: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/orders/user/${UserId}`
    );
  }

  CreatCashOrders(cartId: string, userDetails: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/${cartId}`,
      {
        shippingAddress: userDetails,
      }
    );
  }

  CheckOutSession(cartId: string, userDetails: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/orders/checkout-session/${cartId}?url=${environment.host}`,

      {
        shippingAddress: userDetails,
      }
    );
  }
}
