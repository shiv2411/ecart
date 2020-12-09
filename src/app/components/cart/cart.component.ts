import { Component, Input } from '@angular/core';
import {Router} from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Product } from 'src/app/models/product.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Receipt } from 'src/app/models/receipt.model';
// import { FacebookMessagingAPIClient, FacebookPageAPIClient} from 'fb-messenger-sdk';
import { FBCommentEmbedComponent } from 'ngx-facebook';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  @Input() filteredItems: Product[];
  @Input() userid: string;
  enableOrderButton: boolean = true;
  loading: boolean;
  comment: string;
  items: Product[];
  products: string[] = [];
  quantities: number[] = [];
  receipt: Receipt[] = [];
  get totalAmount() {
    const totalAmount = this.filteredItems.map(item => (item.price * item.quantity)).reduce((acc, subtotal) => acc + subtotal);
    console.log(this.userid)
    return totalAmount.toFixed(2);
  }

  constructor(public activeModal: NgbActiveModal,
    private http: HttpClient,
    private router: Router
  ) { }

  addOne(index) {
    this.filteredItems[index].quantity += 1;
  }

  removeOne(index) {
    if (this.filteredItems[index].quantity <= 1) return;
    this.filteredItems[index].quantity -= 1;
  }

  removeAll(index) {
    this.filteredItems[index].quantity = 0;
  }


  placeOrder() {
    for (var i = 0; i < this.filteredItems.length; i++) {
      if (this.filteredItems[i].quantity > 0) {
        this.products.push(this.filteredItems[i].productName);
        this.quantities.push(this.filteredItems[i].quantity)
      }
      console.log(this.totalAmount)
    }
    var reciept = this.products.map((e, i) => this.quantities[i] + ' X ' + e)
    var items = reciept.toString().split(',').join('\n')
    console.log(items);
    let params = new HttpParams();
    const headers = { 'content-type': 'application/json' };
    params = params.append('chatfuel_token', 'mELtlMAHYqR0BvgEiMq8zVek3uYUK3OJMbtyrdNPTrQB9ndV0fM7lWTFZbM4MZvD');
    params = params.append('chatfuel_block_name', 'checkout');
    params = params.append('items', items);
    params = params.append('total_cost', this.totalAmount.toString());
    params = params.append('comments', this.comment);
    this.loading = true;
    this.http.post(`https://api.chatfuel.com/bots/5bcb13570ecd9f5c9b37d6a5/users/${this.userid}/send?`, null, { 'headers': headers, 'params': params })
      .subscribe((res) => {
        this.loading = false;
        this.enableOrderButton = false;
      //  alert("Order placed for user id:" + this.userid);
        this.router.navigateByUrl('/getTransactionDetails')
      },
      (error) => {
        this.router.navigateByUrl('/getTransactionDetails')
        this.loading = false;
        alert(error.message)
      }
      );
    console.log("Cart Item is:", this.filteredItems);
    console.log('special instruction', this.comment)
  }



}
