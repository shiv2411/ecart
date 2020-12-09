import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetTranscationDetailsComponent } from './get-transcation-details/get-transcation-details.component';
import { ProductPageComponent } from './product-page/product-page.component';

const routes: Routes = [
  { path: '', component: ProductPageComponent },
  { path: 'getTransactionDetails', component: GetTranscationDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
