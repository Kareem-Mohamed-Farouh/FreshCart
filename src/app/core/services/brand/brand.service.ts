import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands`);
  }

  getSpecificProducts(id: string): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/brands${id}`);
  }
}
