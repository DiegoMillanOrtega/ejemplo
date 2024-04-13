import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../../service/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../service/category.service';
import { Category } from '../../../../model/category.model';


@Component({
  selector: 'app-details-products',
  templateUrl: './details-products.component.html',
  styleUrl: './details-products.component.css'
    
    
})
export class DetailsProductsComponent implements OnInit{
  
  private _routed = inject(ActivatedRoute);
  private _inventoryService = inject(InventoryService);
  private _route = inject(Router);
  private categoryService = inject(CategoryService);

  productId: number = 0;
  product?: string;
  detailsProduct: FormGroup;
  categoryList: Category[] = [];
  loading: boolean = true;

  constructor(private form: FormBuilder) {
    this.detailsProduct = this.form.group({
      id: ['', Validators.required],
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this._routed.params.subscribe(params => {
      this.productId = params['productId'];
      this.product = params['product'];

      this._inventoryService.getProductId(this.productId).subscribe(
        response => {
          this.detailsProduct?.patchValue(response);
          this.detailsProduct.get('id')?.disable();
        },
        error => console.error(error)
      )
    }
    );
    this.categoryService.getCategoryList().subscribe(
      response => {
        this.categoryList = response;
      },
      error => console.error('error al obtener lista de categoria', error)
    );
    
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }
  
  categoriaSeleccionada(category: string) {
    this.detailsProduct.get('category')?.setValue(category);
  }

  actualizarProducto(): void {
    this.detailsProduct.get('id')?.enable()
    this._inventoryService.saveProduct(this.detailsProduct.value).subscribe(
      response => {
        Swal.fire({
          title: 'Producto actualizado exitosamente',
          icon: 'success',
          position: 'top-right',
          showConfirmButton: false,
          timer: 900,
        })
        this._route.navigate(['/inventory']);

      },
      error => window.alert(error)
    )

    this.detailsProduct.get('id')?.disable();
  }
}



