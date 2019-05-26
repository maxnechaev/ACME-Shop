import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from "../../cart.service";
import { ProductService } from "../../product.service";
import { Product } from '../../product.model';
import { CartItem } from '../../cart-item.model';
import { ActivatedRoute } from '@angular/router';
import { ModalWindowComponent } from '../modal-window/modal-window.component';
import { BehaviorSubject, Observable, Subject, Subscriber, of } from 'rxjs';




@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  addedProducts$: any;
  addedProducts: Product[] = [];

  itemsInCart: Product[] = [];


  @Input() public item: CartItem;

  displayedColumns: string[] = ['image', 'title', 'price', 'actions'];

  constructor(
    private activatedRoute: ActivatedRoute,
		private productService: ProductService,

  ) {

  }

  ngOnInit() {
    this.productService.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);

  }

  getTotalCost() {
      return this.itemsInCart.map(t => t.price).reduce((acc, value) => acc + value, 0);
    }

  public removeItem(item: Product) {
    this.productService.removeFromCart(item);
  }




}
