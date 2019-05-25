import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MatCardModule, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { ListComponent } from '../list/list.component';
import { CartComponent } from '../cart/cart.component';
import { CartService } from "../../cart.service";
import { ProductService } from "../../product.service";
import { Product } from "../../product.model";


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  addedProducts = [];

  constructor(public thisDialogRef: MatDialogRef<ModalWindowComponent>, @Inject(MAT_DIALOG_DATA) public data: string) { }

  ngOnInit() {
  }



  onCloseCancel(){
    this.thisDialogRef.close('Cancel');
  }

  onCloseConfirm(product){
    this.thisDialogRef.close('Confirm');
    // console.log('Test from onCloseConfirm. product is ', product);
    // product = this.data;
    // this.addedProducts.push(product);
    // console.log('addedProducts is ', this.addedProducts);

    // this.cartService.addProductToCart(product).subscribe(() => {
    //   this.cartService.addProductToCart(id, title, image, description, price, quantity);
    // });
  }






}
