import { Component, Input, OnInit, Output } from '@angular/core';

import { Product } from '../../models/product.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  @Input() category: String;
  @Input() items: Product[];
  @Input() userid: string;
  @Input() getFormattedId: string;

  @Output() changedItem;

  constructor() { }

  ngOnInit(): void {
    console.log(this.userid)
    console.log(this.items);
  }

  addOne(index) {
    this.items[index].quantity += 1;
  }

  removeOne(index) {
    if (this.items[index].quantity <= 1) return;
    this.items[index].quantity -= 1;
  }

}
