import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private productApi = 'https://localhost:7285/api/Products';
  private categoryApi = 'https://localhost:7285/api/Category';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.productApi);
  }

  getCategories(): Observable<any[]> {
    return this.http.get<any[]>(this.categoryApi);
  }

  getProductById(id: number) {
  return this.http.get<any>(`https://localhost:7285/api/Products/${id}`);
}
}
