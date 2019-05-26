import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MatCardModule, MatDialog, MatDialogConfig, MAT_DIALOG_DATA } from "@angular/material";
import { ListComponent } from '../list/list.component';
import { CartComponent } from '../cart/cart.component';
import { CartService } from "../../cart.service";
import { ProductService } from "../../product.service";
import { Product } from "../../product.model";
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  selectedProducts: Product[] = [];


  constructor(
    public dialogRef: MatDialogRef<ModalWindowComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string,
    private http: HttpClient
    // public addedProducts: CartComponent
  ) { }


  ngOnInit() {


  }

  onCloseCancel(){
    this.dialogRef.close('Cancel');
  }

  checkSelectedProducts(){
    console.log(this.selectedProducts);
  }


  onCloseConfirm(data){

    // if (data) {

      // this.selectedProducts.push(data);
      console.log('Data is ', data);
      this.dialogRef.close('Added');
      // console.log('this.selectedProducts have ', this.selectedProducts);
      console.log('data is type of ', typeof data);
      return this.http.post(`http://127.0.0.1:3000/cart`, data);
    // } else {
    //   console.log('Something wrong happened...')
    // }
  }

}
