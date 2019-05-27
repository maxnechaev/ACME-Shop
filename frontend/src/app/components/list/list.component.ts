import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material";
import { ProductService } from "../../product.service";
import { Product } from "../../product.model";
import { ModalWindowComponent } from '../modal-window/modal-window.component';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[];
  dialogResult = '';

  constructor(
    private productService: ProductService,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService
      .getProducts()
      .subscribe((data: Product[]) => {
        this.products = data;
        console.log('this.products is ', this.products);
      });
  }

  openDialog(product: Product) {
    let dialogRef = this.dialog.open(ModalWindowComponent, {
      data: product,
      width: '600px',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog closed ${JSON.stringify(result)}`);
      this.dialogResult = result;
    })
  }

  addToCart(product: Product){
    this.productService.addToCart(product);
  }

}
