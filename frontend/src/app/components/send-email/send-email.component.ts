import { Component, OnInit, Input } from '@angular/core';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { HttpClient } from "@angular/common/http";
import { CartComponent } from '../cart/cart.component';
import { Product } from '../../product.model';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent implements OnInit {

  @Input() itemsInCart;
  loading = false;
  buttionText = "Submit";

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email
  ]);

  constructor(private http: HttpClient, private order: CartComponent) { }

  ngOnInit() {
  }


  sendEmail() {
  this.loading = true;
  this.buttionText = "Submiting...";
  let user = {
    order: this.order.itemsInCart,
    email: this.emailFormControl.value
  }
  this.http.post("http://127.0.0.1:3000/send-email", user).subscribe(
    data => {
      let res:any = data;
      console.log(
        `👏 > 👏 > 👏 > 👏 ${user.email} is successfully registered and mail has been sent and the message id is ${res.messageId}`
      );
      console.log('user.order1 is ',
      Object.keys(user.order)
    );
    },
    err => {
      console.log(err);
      this.loading = false;
      this.buttionText = "Submit";
    },() => {
      this.loading = false;
      this.buttionText = "Submit";
      console.log('user.order2 is ');
    }
  );
}

}
