import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.service';
import { Product } from '../model/product.service';
import { Router } from '@angular/router';
//import { not } from 'rxjs/internal/util/not';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  public products: Array<Product> = [];
  public keyword: string = '';
  totalPages: number = 0;
  pageSize: number = 3;
  currentPage: number = 2;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit() {
    this.getProducts();
  }
  /*
  getProducts(): void {
    /* Without pagination
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (data) => {
        this.products = data;
      },
      *

    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (resp) => {
        this.products = resp.body as Product[];
        let totalProducts: number = parseInt(
          resp.headers.get('X-Total-Count')!
        );
        //this.totalPages = Math.ceil(totalProducts / this.pageSize);
        //this.totalPages = Math.floor(totalProducts / this.pageSize);
        // Add page for other iteams

        if (totalProducts % this.pageSize != 0) {
          this.totalPages = this.totalPages + 1;
        }

        console.log('totalPages =' + this.totalPages);
        console.log('totalProduct' + totalProducts);
      },
      error: (err) => {
        console.log(err);
      },
    });
    /*
    this.productService.getProducts(this.currentPage, this.pageSize).subscribe({
      next: (resp) => {
        this.products = resp.body as Product[];
        //resp.headers('Access-Control-Expose-Headers', 'X-Total-Count')
        //resp.headers('X-Total-Count', this.products.length)
        const totalProductsHeader = resp.headers.get('x-total-count');
        if (totalProductsHeader) {
          const totalProducts: number = parseInt(totalProductsHeader, 10);
          this.totalPages = Math.ceil(totalProducts / this.pageSize);
        } else {
          console.error('x-total-count header not found');
        }
        console.log(this.products.length);
        console.log(totalProductsHeader);
        console.log(this.totalPages);
      },
      error: (err) => {
        console.log(err);
      },*
  }
*/
  handleCheckProduct(product: Product) {
    //product.checked = !product.checked;
    this.productService.checkProduct(product).subscribe({
      next: (updatedProduct) => {
        //product.checked = !product.checked;
        this.getProducts();
      },
    });
  }

  handleDeleteProduct(product: Product) {
    if (confirm('Ees - vous sur ?'))
      this.productService.deleteProduct(product).subscribe({
        next: (value) => {
          this.getProducts();
        },
      });
  }
  searchProduct() {
    this.products = this.products.filter((p: any) =>
      p.name.includes(this.keyword)
    );

    /* Methode 2
    let result: any[] = [];
    for (let p of this.products) {
      if (p.name.includes(this.keyword)) {
        result.push(p);
      }
    }
    this.products = result;
    */
  }

  handleGotoPage(page: number) {
    this.currentPage = page;
    this.getProducts();
  }
  handlePageChange(event: any) {
    this.currentPage = event.page;
    this.getProducts();
  }

  getProducts() {
    this.productService.getProducts().subscribe({
      next: ({ body, headers }) => {
        this.products = body as Product[];
        //const totalProductsHeader = headers.get('X-Total-Count');
        let totalProductsHeader: number = this.products.length;
        console.log('Items ' + totalProductsHeader);
        if (totalProductsHeader) {
          console.log('Total header' + totalProductsHeader);
          let totalProducts: number = totalProductsHeader;
          console.log('total des pro ' + totalProducts);
          this.totalPages = Math.ceil(totalProducts / this.pageSize);
          console.log('Total Pages :' + this.totalPages);
        } else {
          console.error('x-total-count header not found');
        }
      },
      error: (err) => {
        console.error('Error fetching products:', err);
      },
    });
  }
  handleEditProduct(product: Product) {
    this.router.navigateByUrl(`/editProduct/${product.id}`);
  }
}
