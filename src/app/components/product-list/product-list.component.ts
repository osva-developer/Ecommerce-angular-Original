import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/common/product';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',

  //  templateUrl: './product-list-table.component.html',
  //  templateUrl: './product-list.component.html',

  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  products: Product[];
  currentCategoryId: number;
  searchMode: boolean;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.listProducts();
    });
  }

  listProducts() {
    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      console.log('we will search a product');
      this.handleSearchProducts();
    } else {
      this.handleListProducts();
    }
  }

  handleSearchProducts() {
    const theKeyword: string = this.route.snapshot.paramMap.get('keyword');
    console.log('theKeyword:' + theKeyword);
    // now search for the products using keyword
    this.productService.searchProducts(theKeyword).subscribe((data) => {
      this.products = data;
    });
  }

  handleListProducts() {
    // check if the id parameter is available
    const hasCategoryId: boolean = this.route.snapshot.paramMap.has('id');
    if (hasCategoryId) {
      // get the "id" param string convert string to a number using the "+" symbol
      console.log('it has category:' + hasCategoryId);
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
      // this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      //  not category id available ... default to category id 1
      console.log('it does not has category:' + hasCategoryId);
      this.currentCategoryId = 1;
    }
    // get the products for the given category id
    this.productService
      .getProductList(this.currentCategoryId)
      .subscribe((data) => {
        this.products = data;
      });
  }
}
