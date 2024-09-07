import { Component, HostListener, OnInit, inject } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';
import { Inventory } from '../../../model/inventory.model';
import Swal from 'sweetalert2';
import { CategoryService } from '../../../service/category.service';
import { Category } from '../../../model/category.model';
import { AlertsService } from '../../../alerts/alerts.service';
import { Pedido } from '../../../model/pedido.model';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.css',
})
export class InventoryComponent implements OnInit {
  private _inventoryService = inject(InventoryService);
  private categoryService = inject(CategoryService);
  private alerts = inject(AlertsService);

  inventoryList: Inventory[] = [];
  categoryList: Category[] = [];
  selectedProducts: Inventory[] = [];
  productName: string = '';
  productCategory: string = '';
  loading: boolean = true;
  confirmedProductDelivery: boolean = false;

  async deleteProduct(id: number) {
    const resultado = await this.alerts.mostrarConfirmacion();

    if (resultado) {
      this._inventoryService.deleteProductId(id).subscribe(
        (response) => {
          this._inventoryService.getInventoryList().subscribe(
            (data) => (this.inventoryList = data),
            (error) =>
              console.error('Error al obtener la lista de inventario', error)
          );
          this.alerts.mostrarMensajeExito(
            'Eliminado',
            'El producto ha sido eliminado'
          );
        },
        (error) =>
          this.alerts.mostrarMensajeError('Error al eliminar el producto')
      );
    }
  }

  ngOnInit(): void {
    this._inventoryService.getInventoryList().subscribe({
      next: (data) => (this.inventoryList = data),
      error: (error) =>
        console.error('Error al obtener la lista de inventario', error),
      complete: () => (this.loading = false),
    });
    this.categoryService.getCategoryList().subscribe(
      (data) => {
        this.categoryList = data;
      },
      (error) => console.error('Error al obtener la lista de categorias', error)
    );

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  buscarProductos() {
    this.loading = true;

    this._inventoryService.searchProductByName(this.productName).subscribe({
      next: (data) => {
        this.inventoryList = data;
        this.productName = '';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }

  buscarProductosByCategory(category: string) {
    this.loading = true;
    this.productCategory = category;
    this._inventoryService.searchByCategory(category).subscribe({
      next: (data) => {
        this.inventoryList = data;
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
  toggleConfirmation(producto: Inventory) {
    if (producto.stock > 0) {
      producto.selected = !producto.selected;
      if (producto.selected) {
        this.selectedProducts.push(producto);
      } else {
        this.selectedProducts = this.selectedProducts.filter(
          (p) => p.id !== producto.id
        );
      }
    } else {
      this.alerts.mostrarMensajeError(
        'No hay suficiente stock para este producto.'
      );
    }
  }

  submitOrder() {
    if (this.selectedProducts.length > 0) {
      this._inventoryService.setSelectedProducts(this.selectedProducts);
    }
  }
}
