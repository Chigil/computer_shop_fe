import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule,
    MatCardModule,
  ],
  exports: [
    ProductDetailComponent,
  ],
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
  ],
})
export class ProductsModule {}
