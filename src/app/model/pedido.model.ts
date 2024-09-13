import { Client } from "./client.model";
import { FormaPago } from "./forma-pago.model";
import { PedidoDetalle } from "./pedidoDetalle.model";

export interface Pedido {
    id?: number;
    price: number | string;
    address: string;
    client: Client; // Enviar solo el ID del cliente
    paymentType: FormaPago;
    pedidoDetalles?: PedidoDetalle[];
}