import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./product.model";
import { ListComponent } from './components/list/list.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  // uri = 'http://127.0.0.1:3000';

  constructor(private http: HttpClient, public product: Product, private products: ListComponent) {



  }

  // addProductToCart(product){
  //   product = this.product;
  //   return this.http.post(`${this.uri}/cart`, product);
  // }


}
