import { Component, OnInit, inject } from '@angular/core';
import { Pedido } from '../../../../../model/pedido.model';
import { PedidoService } from '../../../../../service/pedido.service';

@Component({
  selector: 'app-list-pedidos',
  templateUrl: './list-pedidos.component.html',
  styleUrl: './list-pedidos.component.css'
})
export class ListPedidosComponent implements OnInit{


  private pedidoService = inject(PedidoService);

  confirmedDelivery: boolean = false;
  listPedidos: Pedido[] = [];

  ngOnInit(): void {
    this.loadListPedidos();
  }

  loadListPedidos(): void {
    this.pedidoService.getPedidoList().subscribe(
      params => {
        this.listPedidos = params
      },
      error => console.error('error al obtener lista pedidos', error)
    )
  }

  toggleConfirmation(pedido: Pedido) {
    pedido.confirmedDelivery = !pedido.confirmedDelivery;
    this.pedidoService.confirmedDelivery(pedido).subscribe(
      params => {
        console.log(params)
        this.loadListPedidos();
      },
      error => console.error('error al confirmar pedido', error)
    )
  }
}
