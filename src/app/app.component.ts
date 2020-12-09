import { Component, HostListener, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CartComponent } from './components/cart/cart.component';
import { combineLatest, forkJoin } from 'rxjs';

import { Category } from './models/category.model';
import { Product } from './models/product.model';

import { ApiService } from './services/api.service';
import { LocalStorageService } from './services/localstorage.service';
import { ActivatedRoute } from '@angular/router';
import { FacebookModule, FacebookService, FBCommentEmbedComponent, InitParams , UIParams} from 'ngx-facebook';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  categories: Category[]
  items: Product[] = [];
  filteredItems: Product[] = [];
  enableCheckout: boolean = false;
  baseUrl: string;
  userid: string;
  selectedCategory: string;

  width = document.body.clientWidth - 100;

  get totalAmount() {
    const totalAmount = (this.filteredItems && this.filteredItems.length) ? this.filteredItems.map(item => (item.price * item.quantity)).reduce((acc, subtotal) => acc + subtotal) : 0;
    this.enableCheckout = (+totalAmount > 0) ? true : false;
    return totalAmount.toFixed(2);
  }

  constructor(private localStorageService: LocalStorageService, private api: ApiService, private cartModal: NgbModal,
    private route: ActivatedRoute,
    private facebookService: FacebookService) {
    this.route.queryParams.subscribe(params => {
      this.userid = params['userid'];
    })
  }


  ngOnInit() {
    console.log(document.body)
    // this.initFacebookService();

    forkJoin([
      this.api.getListOfCategory(),
      this.api.getListOfProduct()
    ]).subscribe(
      ([categories, items]) => {
        items.forEach(item => item.quantity = 0);

        this.categories = categories;
        this.items = items;
        this.filteredItems = items;
        this.selectedCategory = this.getFormattedId(this.categories[0].category);
        console.log('asdfsd', this.selectedCategory)
      }
    )
    console.log('asdfsd', this.selectedCategory)



  }

  windowClose(){
    open('http://localhost:4200/', '_self').close()
  }

  /*private initFacebookService(): void {
    const initParams: InitParams = { xfbml:true, version:'v3.2'};
    this.facebookService.init(initParams);
    const messenger: UIParams = {
      href: 'https://connect.facebook.net/en_US/messenger.Extensions.js',
      method: 'share'
    }
    this.facebookService.ui(messenger);
    console.log(this.facebookService.ui(messenger))
  }  */
  filterProductsByCategory(category): Product[] {
    return this.filteredItems.filter(item => item.category.toLowerCase() === category.toLowerCase());
  }

  filterProducts(searchText): void {
    this.filteredItems = this.items.filter(item => (item.productName.toLowerCase()).indexOf(searchText.toLowerCase()) != -1);
  }

  openCheckoutModal(): void {
    const cartModal = this.cartModal.open(CartComponent, { size: 'xl' });
    cartModal.componentInstance.filteredItems = this.filteredItems;
    cartModal.componentInstance.userid = this.userid;
  }

  getFormattedId(category): string {
    return category.toLowerCase().replaceAll(/ /gi, '_');
  }

  goToCategory(category) {
    const formattedCategory = this.getFormattedId(category);
    this.selectedCategory = formattedCategory;
    const categoryElement = document.getElementById(formattedCategory);
    categoryElement.scrollIntoView({behavior: 'smooth', block: 'center' });
  }

 /* @HostListener('window:scroll', ['$event'])
  onScrollEvent(event) {
  console.log(this.width);
    const elementAtPoint = document.elementFromPoint((this.width / 2), 150);
    if (elementAtPoint.className === 'col-12 text-center') {
      console.log(elementAtPoint.children[1])
      if (elementAtPoint.children[1].id) {
        console.log(elementAtPoint.children[1])
        this.selectedCategory = elementAtPoint.children[1].id;
        console.log(this.selectedCategory)
      }
    }
  }
 */

}
