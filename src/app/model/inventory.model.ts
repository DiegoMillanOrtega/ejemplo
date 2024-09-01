export interface Inventory {
    id:       number;
    product:  string;
    category: string;
    price: number | string;
    stock:    number;
    selected?: boolean;
}
