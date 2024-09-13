import { Inventory } from "./inventory.model";
import { Pedido } from "./pedido.model";


export interface PedidoDetalle {
    id?: number;
    pedido: Pedido;
    producto: Inventory[]; // Enviar solo el ID del producto
    cantidad: number[];
}