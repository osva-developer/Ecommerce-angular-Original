import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient: HttpClient) {}

  getProductList(theCategoryId: number): Observable<Product[]> {
    this.httpClient.get(this.baseUrl).subscribe((posts) => {
      // ...
      console.log(posts);
    });

    // need to build url based on category id
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;
    console.log(searchUrl);
    return this.httpClient
      .get<GetResponse>(searchUrl) //GetResponse to define the type of answer
      .pipe(map((response) => response._embedded.products));
  }
  /*
  Notes
  *Pipes let you combine multiple functions into a single function.
  *pipe  is a method(rxjs) that allows you to funnel your observable data through multiple operators before they reach the subscribe method.
  *The map operator allows us to get some data and return new data which is then automatically re-wrapped into an observable so that we can still subscribe to it.
  */
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}
