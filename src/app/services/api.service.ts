import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Category } from '../models/category.model';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  getItems = 'https://script.google.com/macros/s/AKfycbzHLstbwnJmw_N2nkYUekMCP4KFE62KeeSjIr6hj7dgYXC0oWw/exec?actionType=getItems';

  constructor(private httpClient: HttpClient) { }

  getListOfCategory(): Observable<Category[]> {
    console.log(this.httpClient.get<Category[]>('https://script.google.com/macros/s/AKfycbzHLstbwnJmw_N2nkYUekMCP4KFE62KeeSjIr6hj7dgYXC0oWw/exec?actionType=getCategory'))
    return this.httpClient.get<Category[]>('https://script.google.com/macros/s/AKfycbzHLstbwnJmw_N2nkYUekMCP4KFE62KeeSjIr6hj7dgYXC0oWw/exec?actionType=getCategory')
  }

  getListOfProduct(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(this.getItems);
  }

}
