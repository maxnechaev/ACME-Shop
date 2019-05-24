import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatTableDataSource, MatCardModule, MatDialog, MatDialogConfig } from "@angular/material";

import { ProductService } from "../../product.service";
import { Product } from "../../product.model";


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  products: Product[];
  displayedColumns = ['title', 'image', 'price', 'actions'];

  constructor(private productService: ProductService, private router: Router, private modal: MatDialog) { }

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.productService
    .getProducts()
    .subscribe((data: Product[]) => {
      this.products = data;
      console.log('Data requested...');
      console.log(this.products);
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

  openModal() {
    this.modal.open(this.products);
  }

}
