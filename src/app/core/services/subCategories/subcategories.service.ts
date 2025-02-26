import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubcategoriesService {
  constructor(private readonly httpClient: HttpClient) {}

  getAllSubcategory(): Observable<any> {
    return this.httpClient.get(`${environment.baseUrl}/api/v1/subcategories`);
  }

  getSpecificSubcategory(idsubcat: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/subcategories/${idsubcat}`
    );
  }

  getALLSubcategoryOnSpecific(idcat: string): Observable<any> {
    return this.httpClient.get(
      `${environment.baseUrl}/api/v1/categories/${idcat}/subcategories`
    );
  }
}
