import { Injectable } from '@angular/core';
import { Product } from "./product.model";
// import { EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export abstract class CartService {


  constructor(
    public product: Product,

  ) { }
  // abstract setQuantity(quantity: number): void;
  //
  // abstract getQuantity(): number;
  //
  // abstract getPrice(): number;
  //
  // public total(): number {
  //   return this.getPrice() * this.getQuantity();
  // }
  //
  // change: 'items';
  //
  //
  //
  // public onItemAdded: EventEmitter<any> = new EventEmitter<any>();
  //
  // public onItemRemoved: EventEmitter<any> = new EventEmitter<any>();
  //
  // public onItemsChanged: EventEmitter<number> = new EventEmitter<number>();
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
