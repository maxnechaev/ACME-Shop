import { Component, OnInit, Input } from '@angular/core';
import { ProductService } from "../../product.service";
import { CartService } from "../../cart.service";
import { Product } from '../../product.model';
// import { CartItem } from '../../cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  addedProducts$: any;
  addedProducts: Product[] = [];

  public itemsInCart: Product[] = [];

  displayedColumns: string[] = ['image', 'title', 'price', 'actions'];

  constructor(
		private productService: ProductService,
    @Input() public cartService: CartService,
    // @Input() public cartItem: CartItem
  ) { }

  ngOnInit() {
    this.productService.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  getTotalCost() {
      return this.itemsInCart.map(t => t.price).reduce((acc, value) => acc + value, 0);
    }

  removeItem(item) {
    this.productService.removeFromCart(item);
  }

  // increase(item: CartItem) {
  //   item.setQuantity(item.getQuantity() + 1);
  //   this.cartItem.addItem(item);
  // }
  //
  // decrease(item: CartItem) {
  //   if (item.getQuantity() > 1) {
  //     item.setQuantity(item.getQuantity() - 1);
  //     this.cartItem.addItem(item);
  //   } else {
  //     this.cartItem.removeItem(item.getId());
  //   }
  // }

}
