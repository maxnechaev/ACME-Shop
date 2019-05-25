import { Component, OnInit } from '@angular/core';
import { CartService } from "../../cart.service";
import { ProductService } from "../../product.service";
import { Product } from '../../product.model';
import { CartItem } from '../../cart-item.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  public items: CartItem[] = [];
	public total: number = 0;


  constructor(
    private activatedRoute: ActivatedRoute,
		private productService: ProductService
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
    let id = params['_id'];
    let item: CartItem = {
          product: this.productService.find(id),
          quantity: 1
        };
    let cart: any = ['test'];
    cart.push(JSON.stringify(item));
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("result").innerHTML = localStorage.getItem("cart");
})

    this.activatedRoute.params.subscribe(params => {
    let id = params;
    console.log('params is ', params);
    if (id) {
      let item: CartItem = {
        product: this.productService.find(id),
        quantity: 1
      };
      // if (localStorage.getItem('cart') == null) {
      //   let cart: any = [];
      //   cart.push(JSON.stringify(item));
      //   localStorage.setItem('cart', JSON.stringify(cart));
      // }
      // else {
      //   let cart: any = JSON.parse(localStorage.getItem('cart'));
      //   let index: number = -1;
      //   for (let i = 0; i < cart.length; i++) {
      //     let item: CartItem = JSON.parse(cart[i]);
      //     if (item.product._id == id) {
      //       index = i;
      //       break;
      //     }
      //   }
      //   if (index == -1) {
      //     cart.push(JSON.stringify(item));
      //     localStorage.setItem('cart', JSON.stringify(cart));
      //   } else {
      //     let item: CartItem = JSON.parse(cart[index]);
      //     item.quantity += 1;
      //     cart[index] = JSON.stringify(item);
      //     localStorage.setItem("cart", JSON.stringify(cart));
      //   }
      // }
      // this.loadCart();
    }
    // else {
    //   this.loadCart();
    // }
  });
  }

  loadCart(): void {
		this.total = 0;
		this.items = [];
		let cart = JSON.parse(localStorage.getItem('cart'));
		for (let i = 0; i < cart.length; i++) {
			let item = JSON.parse(cart[i]);
			this.items.push({
				product: item.product,
				quantity: item.quantity
			});
			this.total += item.product.price * item.quantity;
		}
	}

	remove(id: string): void {
		let cart: any = JSON.parse(localStorage.getItem('cart'));
		let index: number = -1;
		for (let i = 0; i < cart.length; i++) {
			let item: CartItem = JSON.parse(cart[i]);
			if (item.product._id == id) {
				cart.splice(i, 1);
				break;
			}
		}
		localStorage.setItem("cart", JSON.stringify(cart));
		this.loadCart();
	}




}
