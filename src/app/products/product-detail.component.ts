import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct | undefined;
  sub!: Subscription;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.pageTitle += `: ${id}`;
    this.sub = this.productService.getProducts().subscribe({
      next: products => {
        this.product = products.find(p => p.productId === Number(id));
      },
      error: err => this.errorMessage = err
    });

  }

  getProduct(id: number): void {
    this.productService.getOneProduct(id).subscribe({
      next: product => this.product = product,
      error: err => this.errorMessage = err
    });
  }

  onBack(): void {
    this.router.navigate(['/products']);
  }
}
