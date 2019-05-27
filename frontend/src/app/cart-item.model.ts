import { Product } from './product.model';
// import { EventEmitter } from '@angular/core';

export abstract class CartItem {
  product: Product;
  quantity: number;
  //
  // public onItemAdded: EventEmitter<any> = new EventEmitter<any>();
  //
  // public onItemRemoved: EventEmitter<any> = new EventEmitter<any>();
  //
  // public onItemsChanged: EventEmitter<number> = new EventEmitter<number>();
  //
  // public abstract getId(): any;
  //
  // public abstract getName(): string;
  //
  // public abstract getItem(id: any): any;
  //
  // public abstract getItems(): any[];
  //
  // public abstract addItem(item: any): void;
  //
  // public abstract removeItem(id: any): void;
  //
  // public abstract itemCount(): number;
  //
  // public abstract entries(): number;
  //
  // public abstract cost(): number;
  //
  // public abstract clear(): void;
  //
  // public abstract setQuantity(quantity: number): void;
  //
  //
  // public abstract getQuantity(): number;
  //
  // public abstract getPrice(): number;
  //
  // public total(): number {
  //   return this.getPrice() * this.getQuantity();
  // }
  //
  // change: 'items';
  //
  // public totalCost(): number {
  //   return this.cost();
  // }
  //
  // public toObject(): any {
  //   return {
  //     items: this.getItems()
  //   };
  // }

}
