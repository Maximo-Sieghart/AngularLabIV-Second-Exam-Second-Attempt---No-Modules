import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  categories: any[] = [];
  updateCategoryForm: FormGroup;

  constructor(private productService: ProductService, private fb: FormBuilder) {
    this.updateCategoryForm = this.fb.group({
      productCategoryId: [null, Validators.required],
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadProductsAndCategories();
  }

  loadProductsAndCategories(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });

    this.productService.getProductCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }

  deleteProduct(productId: number): void {
    this.productService.deleteProduct(productId).subscribe(() => {
      this.products = this.products.filter((product) => product.productId !== productId);
    });
  }

  updateCategory(): void {
    if (this.updateCategoryForm.valid) {
      const { productCategoryId, name } = this.updateCategoryForm.value;
      this.productService.updateProductCategory(productCategoryId, name).subscribe(() => {
        this.loadProductsAndCategories();
        this.updateCategoryForm.reset();
      });
    }
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find((cat) => cat.productCategoryId === categoryId);
    return category ? category.description : 'Unknown';
  }
}
