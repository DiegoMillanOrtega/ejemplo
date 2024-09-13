import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoDetalle } from '../model/pedidoDetalle.model';


@Injectable({
  providedIn: 'root'
})
export class PedidoDetalleService {

  private apiUrl: string = 'http://localhost:8080/pedidoDetalle'
  private http = inject(HttpClient);

  

  public savePedidoDetalle(pedidoDetalle: PedidoDetalle): Observable<PedidoDetalle> {
    return this.http.post<PedidoDetalle>(`${this.apiUrl}/savePedidoDetalle`, pedidoDetalle);
}
}
