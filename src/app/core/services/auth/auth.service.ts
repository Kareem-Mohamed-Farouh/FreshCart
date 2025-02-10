import { JwtDecodeOptions } from './../../../../../node_modules/jwt-decode/build/esm/index.d';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private readonly httpClient: HttpClient) {}
  private readonly router = inject(Router);

  sendRegiserForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signup`,
      data
    );
  }

  sendLoginForm(data: object): Observable<any> {
    return this.httpClient.post(
      `${environment.baseUrl}/api/v1/auth/signin`,
      data
    );
  }

  // object have information of user
  userData: any;
  getUserData(): void {
    if (localStorage.getItem('token') !== null) {
      this.userData = jwtDecode(localStorage.getItem('token')!);
      console.log(this.userData);
    }
  }

  logoutUser(): void {
    // 1- remove token
    localStorage.removeItem('token');

    // navigate to log in
    this.router.navigate(['/login']);

    this.userData = null;
  }
}
