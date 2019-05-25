import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from "./product.model";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  uri = 'http://127.0.0.1:3000';
  private products: Product[];

  constructor(private http: HttpClient) {


    this.products = this.findAll();

    // this.products = [
    //
    //   {
    //      price:34,
    //      quantity:5435,
    //      _id:"5ce752667828ad212e909e0c",
    //      title:"again new shoes",
    //      image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTjM2qpXq1CEOnDjTFyd001zyCUuTTsS9Uy2ZU64pHi-g2UfBkMVYo7UJdOPBSsvdZ_z0kOudPntgI&usqp=CAc",
    //      description:"test descr 2"
    //   },
    //   {
    //      price:14,
    //      quantity:100,
    //      _id:"5ce80605dbf49309633bd3ef",
    //      title:"White shoes",
    //      image:"https://rukminim1.flixcart.com/image/714/857/jao8uq80/shoe/3/r/q/sm323-9-sparx-white-original-imaezvxwmp6qz6tg.jpeg?q=50",
    //      description:"Really white shoes"
    //   },
    //   {
    //      price:34,
    //      quantity:324,
    //      _id:"5ce80819dbf49309633bd3f6",
    //      title:"dsfjl sdskjfkjh ",
    //      image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWQUPWiSdb0ibR9H1TKjP8RLsBDAaMjBKbDuQUx7BJEmR_prPrag",
    //      description:"dsfsdfh"
    //   },
    //
    //     ];

  }

  findAll(): Product[] {
    // console.log(this.http.get(`${this.uri}/products`));
    return this.products;
  }

  // find(id): Product {
  //     return this.products[this.getSelectedIndex(id)];
  // }
  //
  // getSelectedIndex(id) {
  //     for (var i = 0; i < this.products.length; i++) {
  //         if (this.products[i]._id == id) {
  //             return i;
  //         }
  //     }
  //     return -1;
  // }






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

  // getCart(){
  //   return this.http.get(`${this.uri}/cart`);
  // }




}
