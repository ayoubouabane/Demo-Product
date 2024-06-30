import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../model/product.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  //private baseUrl = 'http://localhost:4200/products';
  constructor(private http: HttpClient) {}
  //
  getProducts(page: number = 1, size: number = 10) {
    //Observable<HttpResponse<Product[]>> {
    return this.http.get(
      //return this.http.get<Product[]>(
      //`${this.baseUrl}?page=${page}&size=${size}`,
      `http://localhost:8090/products?_page=${page}&_limit=${size}`,
      { observe: 'response' }
    );
  }
  /*  Method2
  public getProducts(page: number = 1, size: number = 3) {
    //: Observable<Product[]> {
    return this.http.get<Product[]>(
      `http://localhost:8090/products?_page=${page}&_limit=${size}`
      //`${this.baseUrl}?page=${page}&size=${size}`
    );
  }
*/
  public checkProduct(product: Product) {
    return this.http.patch<Product>(
      `http://localhost:8090/products/${product.id}`,
      { checked: !product.checked }
    );
  }

  public deleteProduct(product: Product) {
    return this.http.delete<any>(
      `http://localhost:8090/products/${product.id}`
    );
  }

  saveProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`http://localhost:8090/products`, product);
  }

  public searchProduct(keyword: string): Observable<Array<Product>> {
    return this.http.get<Array<Product>>(
      `http://localhost:8090/products?name_like=${keyword}`
    );
  }
  getProductById(productId: number) {
    return this.http.get<any>(`http://localhost:8090/products/${productId}`);
  }
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `http://localhost:8090/products/${product.id}`,
      product
    );
  }
}
