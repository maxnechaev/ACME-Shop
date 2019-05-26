import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./product.model";
import { ListComponent } from './components/list/list.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  constructor(
    private http: HttpClient,
    public product: Product,

  ) { }


}
