export interface Pedido {
    id:       number | string;
    product:  string;
    category: string;
    price: number | string;
    stock:    number;
    address: string;
    client: string;
    confirmedDelivery: boolean;
}