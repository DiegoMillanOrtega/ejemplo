import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Users } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticatedUser: boolean = false;
  private apiUrl: string = "http://localhost:8080/users";
  private _http = inject(HttpClient);
  
  getUsers(): Observable<Users[]> {
    return this._http.get<Users[]>(`${this.apiUrl}/getUsers`)
  }

  login(username: string, password: string): Observable<any> {
    const body = {username, password};
    return this._http.post(`${this.apiUrl}/postUsers`, body, { responseType: 'text' }).pipe(
      map((response: any) => {
        // Autenticación exitosa
        this.isAuthenticatedUser = true;
        return response;
      }),
      catchError((error) => {
        // Maneja el error de autenticación
        this.isAuthenticatedUser = false;
        return throwError(error);
      })
    );
  }

  isAuthenticated(): boolean {
    return this.isAuthenticatedUser;
  }
}
