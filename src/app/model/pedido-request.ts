import { Client } from './client.model';
import { Inventory } from './inventory.model';
import { Pedido } from './pedido.model';
import { PedidoDetalle } from './pedidoDetalle.model';

export interface PedidoRequest {
  pedido: Pedido;
  productos: Inventory[];
  cantidades: number[];
}
