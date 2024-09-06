

export interface PedidoDetalle {
    idDetallePedido?: number;
    producto: number[]; // Enviar solo el ID del producto
    cantidad: number;
}