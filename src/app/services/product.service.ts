import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'https://utn-lubnan-api-2.herokuapp.com/api';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/Product`);
  }

  getProductCategories(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ProductCategory`);
  }

  deleteProduct(productId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/Product/${productId}`);
  }

  updateProductCategory(productCategoryId: number, name: string): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/ProductCategory`, {
      productCategoryId,
      description: name,
    });
  }
}
