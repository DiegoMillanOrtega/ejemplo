import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Client } from '../model/client.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl: string = 'http://localhost:8080/client';
  private http = inject(HttpClient);

  findAllClients(): Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/getAllClient`);
  }
  
  addClient(client: Client): Observable<any> {
    return this.http.post(`${this.apiUrl}/saveClient`, client, {responseType: 'text'});
  }
  
  deleteClient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/deleteClient/${id}`);
  }
  
  
  findClientById(id: number): Observable<Client> {
    return this.http.get<Client>(`${this.apiUrl}/getClientById/${id}`);
  }

  findClientByName(name: string):Observable<Client[]> {
    return this.http.get<Client[]>(`${this.apiUrl}/getClientByName/${name}`)
  }
}
