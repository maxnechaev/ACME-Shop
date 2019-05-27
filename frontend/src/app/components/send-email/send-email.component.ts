import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { Product } from '../../product.model';
import { ProductService } from "../../product.service";

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  public itemsInCart: Product[] = [];
  loading = false;
  buttionText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(
    private http: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.productService.itemsInCartSubject.subscribe(_ => this.itemsInCart = _);
    // console.log('this.itemsInCart type is', typeof this.itemsInCart);
    // let idArray = this.productService.findIdByProductArray(this.itemsInCart);
    // console.log('deductQuantity(this.itemsInCart, idArray) at start is ', this.productService.deductQuantity(this.itemsInCart, idArray));
  }

  sendEmail() {
    this.loading = true;
    this.buttionText = "Submiting...";
    let user = {
      order: this.itemsInCart,
      email: this.emailFormControl.value
    }
    let idArray = this.productService.findIdByProductArray(this.itemsInCart);
    // console.log('this.itemsInCart is ', this.itemsInCart);
    // console.log('idArray ', idArray);
    this.itemsInCart = this.productService.deductQuantity(this.itemsInCart, idArray);
    // console.log('deductQuantity(this.itemsInCart, idArray) after send email is ', this.productService.deductQuantity(this.itemsInCart, idArray));

    this.http.post("http://127.0.0.1:3000/send-email", user).subscribe(
      data => {
        let res:any = data;
        console.log(
          `E-mail has been sent to ${user.email} and the message id is ${res.messageId}`
        );
      },
      err => {
        console.log(err);
        this.loading = false;
        this.buttionText = "Submit";
      },() => {
        this.loading = false;
        this.buttionText = "Submit";
      }
    );
  }

}
