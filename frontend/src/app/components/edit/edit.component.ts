import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from '@angular/material';

import { ProductService } from "../../product.service";

import { Product } from "../../product.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: String;
  product: any = {};
  updateForm: FormGroup;

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder) {
    this.createForm();
  }

  createForm(){
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      image: '',
      description: '',
      price: '',
      quantity: ''
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      this.productService.getProductById(this.id).subscribe(res => {
        this.product = res;
        this.updateForm.get('title').setValue(this.product.title);
        this.updateForm.get('image').setValue(this.product.image);
        this.updateForm.get('description').setValue(this.product.description);
        this.updateForm.get('price').setValue(this.product.price);
        this.updateForm.get('quantity').setValue(this.product.quantity);
      })
    })
  }

  updateProduct(title, image, description, price, quantity){
    this.productService.updateProduct(this.id, title, image, description, price, quantity).subscribe(() => {
      this.snackBar.open('Product updated successfully!', 'OK', {
        duration: 3000
      })
    });
  }

}
