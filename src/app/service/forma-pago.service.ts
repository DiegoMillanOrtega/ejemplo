import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FormaPago } from '../model/forma-pago.model';

@Injectable({
  providedIn: 'root'
})
export class FormaPagoService {

  private apiUrl: string = 'http://localhost:8080/formaPago';
  private http = inject(HttpClient);


  constructor() { }

  getAllFormasDePago(): Observable<FormaPago[]> {
    return this.http.get<FormaPago[]>(`${this.apiUrl}/getAllFormasDePago`)
  }

  findFormaPagoById(formaPagoID: number) : Observable<FormaPago> {
    return this.http.get<FormaPago>(`${this.apiUrl}/${formaPagoID}`)
  }
}
