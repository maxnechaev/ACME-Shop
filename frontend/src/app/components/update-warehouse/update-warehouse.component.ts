import { Component, OnInit } from '@angular/core';
import { ProductService } from "../../product.service";
import { Product } from "../../product.model";
import { Router } from '@angular/router';


@Component({
  selector: 'app-update-warehouse',
  templateUrl: './update-warehouse.component.html',
  styleUrls: ['./update-warehouse.component.css']
})
export class UpdateWarehouseComponent implements OnInit {

  products = <any>[];
  displayedColumns = ['image', 'title', 'description', 'price', 'actions'];

  constructor(
    private productService: ProductService,
    private router: Router
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

  editProduct(id: string) {
    this.router.navigate([`/edit/${id}`]);
  }

  deleteProduct(id: string) {
    this.productService.deleteProduct(id).subscribe(() => {
      this.fetchProducts();
    });
  }

}
