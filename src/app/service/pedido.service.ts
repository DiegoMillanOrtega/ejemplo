import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido.model';
import { PedidoRequest } from '../model/pedido-request';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl: string = 'http://localhost:8080/pedido'
  private http = inject(HttpClient);

  public getPedidoList(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/getPedidos`);
  }

  public savePedido(pedidoRequest: PedidoRequest): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/savePedido`, pedidoRequest);
}

}
