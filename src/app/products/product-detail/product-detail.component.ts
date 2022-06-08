import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private productService: ProductService,) {
  }
  product: Product = {
    id: '',
    name: '',
    description: '',
    price: 0,
    amount: 0
  };
  ngOnInit(): void {
    this.getProduct();
  }

  getProduct(): void {
    const id = this.route.snapshot.paramMap.get('id') || '';
    this.productService.getProduct(id)
      .subscribe(product => this.product = product);
  }
}



