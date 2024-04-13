import { Component, OnInit, inject } from '@angular/core';
import { InventoryService } from '../../../service/inventory.service';

@Component({
  selector: 'app-container-items',
  templateUrl: './container-items.component.html',
  styleUrl: './container-items.component.css'
})
export class ContainerItemsComponent{

  private inventoryService = inject(InventoryService);
  cantidadProductos: number = 0;

  ngAfterViewInit() {
    this.inventoryService.getInventoryList().subscribe(
      params => this.cantidadProductos = params.length,
      error => console.log('hubo un error al obtener la cantidad de products', error)
    )
  }

}
