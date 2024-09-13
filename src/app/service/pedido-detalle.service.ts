import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoDetalle } from '../model/pedidoDetalle.model';
import { Inventory } from '../model/inventory.model';
import { Pedido } from '../model/pedido.model';


@Injectable({
  providedIn: 'root',
})
export class PedidoDetalleService {
  private apiUrl: string = 'http://localhost:8080/pedidoDetalle';
  private http = inject(HttpClient);

  

  public savePedidoDetalle(pedido: Pedido, productos: Inventory[], cantidades: number[]): Observable<PedidoDetalle[]> {
    const body = {
      pedido: pedido,
      productos: productos,
      cantidades: cantidades
    }
    return this.http.post<PedidoDetalle[]>(`${this.apiUrl}/savePedidoDetalle`, body);
}
}
