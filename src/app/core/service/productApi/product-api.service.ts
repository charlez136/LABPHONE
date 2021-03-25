import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Product } from "@models";
import { environment } from "../../../../environments/environment";

@Injectable({ providedIn: "root" })
export class ProductService {
  constructor(private http: HttpClient) {}

  getAll() {
    return this.http.get<Product[]>(`${environment.baseUrl}/products`);
  }

  add(product: Product) {
    return this.http.post(`${environment.baseUrl}/products/add`, product);
  }
  edit(product: Product) {
    return this.http.post(`${environment.baseUrl}/products/edit`, product);
  }
}
