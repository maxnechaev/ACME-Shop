import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { ProductService } from "../../product.service";
import { Product } from "../../product.model";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  selectedProducts: Product[] = [];
  public itemsInCart: Product[] = [];

  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }

  onCloseConfirm(item: Product){
      this.productService.addToCart(item);
      this.dialogRef.close('Added');
  }

}
