import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Pedido } from '../model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  private apiUrl: string = 'http://localhost:8080/pedido'
  private http = inject(HttpClient);

  public getPedidoList(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${this.apiUrl}/getPedidos`);
  }

  public savePedido(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/savePedido`, pedido, {responseType: 'text'});
  }

  public confirmedDelivery(pedido: Pedido): Observable<any> {
    return this.http.post(`${this.apiUrl}/confirmedDelivery`, pedido, {responseType: 'text'});
  }

}
