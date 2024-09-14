import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../../service/inventory.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../service/category.service';
import { Category } from '../../../../model/category.model';
import { Inventory } from '../../../../model/inventory.model';
import { AlertsService } from '../../../../alerts/alerts.service';


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
  private alerts = inject(AlertsService);

  productId: number = 0;
  product?: string;
  detailsProduct: FormGroup;
  categoryList: Category[] = [];
  category?: Category;
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
          this.detailsProduct.get('category')?.setValue(response.category.category);
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
    this.detailsProduct.get('id')?.enable();

    const category = this.categoryList.find(category => category.category === this.detailsProduct.get('category')?.value);

    if (category) {
      const indexCategory = this.categoryList.indexOf(category);

      const body = {
        id: this.detailsProduct.get('id')?.value,
        product: this.detailsProduct.get('product')?.value,
        category: this.categoryList[indexCategory],
        price: this.detailsProduct.get('price')?.value,
        stock: this.detailsProduct.get('stock')?.value,
      }
  
      this._inventoryService.saveProduct(body).subscribe(
        response => {
          this.alerts.mostrarMensajeExito('Producto Actualizado exitosamente');
          this._route.navigate(['/inventory']);
  
        },
        error => this.alerts.mostrarMensajeError('¡Error al Actualizar el Producto!', error)
      )
    }
    
    

    this.detailsProduct.get('id')?.disable();
  }

}



