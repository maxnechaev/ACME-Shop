import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient) { }

  getProducts(){
    return this.http.get(`${this.uri}/products`);
  }

  getProductById(id){
    return this.http.get(`${this.uri}/products/${id}`);
  }

  addProduct(title, image, description, price, quantity){
    const product = {
      title,
      image,
      description,
      price,
      quantity
    }
    return this.http.post(`${this.uri}/products/add`, product);
  }

  updateProduct(id, title, image, description, price, quantity){
    const product = {
      title,
      image,
      description,
      price,
      quantity
    }
    return this.http.post(`${this.uri}/products/update/${id}`, product);
  }

  deleteProduct(id) {
    return this.http.get(`${this.uri}/products/delete/${id}`);
  }


}
