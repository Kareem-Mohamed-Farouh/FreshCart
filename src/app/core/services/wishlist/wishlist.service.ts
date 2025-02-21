import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  // wishCount = signal(0);
  wishCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  myToken: string = localStorage.getItem('token') || '';

  constructor(private readonly httpClient: HttpClient) {
    if (this.myToken !== null) {
      this.getLoggedUserWishlist().subscribe({
        next: (res) => {
          this.wishCount.next(res.count);
        },
      });
    }
    // console.log(this.myToken);
  }
  addProductToWishlist(idprod: string): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/api/v1/wishlist`, {
      productId: idprod,
    });
  }

  RemoveProductFromWishlist(idproduct: string): Observable<any> {
    return this.httpClient.delete(
      `${environment.baseUrl}/api/v1/wishlist/${idproduct}`
    );
  }

  getLoggedUserWishlist(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/wishlist`, {
      headers: {
        token: this.myToken,
      },
    });
  }
}
