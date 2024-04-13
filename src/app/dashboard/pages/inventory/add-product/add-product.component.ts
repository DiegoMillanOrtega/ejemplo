import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InventoryService } from '../../../../service/inventory.service';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../../service/category.service';
import { Category } from '../../../../model/category.model';
import { AlertsService } from '../../../../alerts/alerts.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit{

  private _inventoryService = inject(InventoryService);
  private categoryService = inject(CategoryService);
  private alerts = inject(AlertsService);
  
  newProduct: FormGroup;
  categoryList: Category[] = [];

  constructor(private form: FormBuilder) {
    this.newProduct = this.form.group({
      product: ['', Validators.required],
      stock: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.categoryService.getCategoryList().subscribe(
      response => {
        this.categoryList = response;
      },
      error => console.error(error)
      )
  }

  enviarProducto() {
    console.log(this.newProduct.value);
    this._inventoryService.saveProduct(this.newProduct.value).subscribe(
      response => {
        this.alerts.mostrarMensajeExito(
          '¡Guardado!',
          'El producto se guardó correctamente'
        )
        this.newProduct.reset();
      },
      error => this.alerts.mostrarMensajeError('Error al guardar el producto')
    )
  }

  categoriaSeleccionada(category: string) {
    this.newProduct.get('category')?.setValue(category);
  }
}
