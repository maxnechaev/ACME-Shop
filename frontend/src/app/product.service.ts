import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./product.model";
import { BehaviorSubject, Observable, Subject, Subscriber, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://127.0.0.1:3000';
  products = <any>[];

  public itemsInCartSubject: BehaviorSubject<Product[]> = new BehaviorSubject([]);
  public itemsInCart: Product[] = [];

  constructor(private http: HttpClient) {

    this.products = this.getProducts();
    this.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);

  }

  public addToCart(item: Product) {
    this.itemsInCartSubject.next([...this.itemsInCart, item]);
    // console.log('Hello from ProductService addToCart');
    console.log('itemsInCart is', this.itemsInCart);
    console.log('itemsInCart length is', this.itemsInCart. length);
  }

  public removeFromCart(item: Product) {
    const currentItems = [...this.itemsInCart];
    const itemsWithoutRemoved = currentItems.filter(_ => _._id !== item._id);
    this.itemsInCartSubject.next(itemsWithoutRemoved);
  }

  public getItems(): Observable<Product[]> {
    return this.itemsInCartSubject.asObservable();
  }

  // public getTotalAmount(): Observable<number> {
  //   return this.itemsInCartSubject.map((items: Product[]) => {
  //     return items.reduce((prev, curr: Product) => {
  //       return prev + curr.price;
  //     }, 0);
  //   });
  // }


  private cartProducts(): Observable<any> {
    return this.http.get(`${this.uri}/products`);
  }



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
