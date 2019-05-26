import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource, MatCardModule, MatDialog, MatDialogConfig } from "@angular/material";

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
  displayedColumns = ['title', 'image', 'price', 'actions'];
  dialogResult = '';

  constructor(
    private productService: ProductService,
    private router: Router,
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

  editProduct(id) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
    });
  }

  openDialog(product) {
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
