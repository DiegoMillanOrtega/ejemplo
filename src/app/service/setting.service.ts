import { Injectable, inject } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { UserSetting } from '../model/userSetting.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SettingService {
  private apiUrl: string = 'http://localhost:8080/users';
  private _http = inject(HttpClient);

  private username: string = '';
  private userSetting?: UserSetting;

  getUserSetting(username: string): Observable<UserSetting> {
    return this._http.get<UserSetting>(
      `${this.apiUrl}/getUserSetting/${username}`
    );
  }

  postUserSetting(userSetting: FormData): Observable<any> {
    return this._http
      .post(`${this.apiUrl}/postUpdateUserSetting`, userSetting, {
        responseType: 'json'
      })
      .pipe(
        map((response: any) => {
          // Verificar si la respuesta no es nula y tiene el formato esperado
          if (response && response.id && response.nameSystem && response.username && response.logo) {
            this.userSetting = response as UserSetting;
          } else {
            // Si la respuesta no tiene el formato esperado, lanzar un error
            throw new Error('La respuesta del servidor tiene un formato incorrecto');
          }
        }),
        catchError((error) => {
          console.error('Error en la solicitud POST:', error);
          return throwError('Error en la solicitud POST');
        })
      );
}
  

  setSharedUsername(username: string): void {
    this.username = username;
  }

  getSharedUsername(): string {
    return this.username;
  }

  setUserSetting(userSetting: UserSetting): void {
    this.userSetting = userSetting;
  }

  obtainedUserSetting() {
    return this.userSetting;
  }

  getLogoSrc(): string {
    // Verifica si el campo logo existe y no es nulo
    if (this.userSetting && this.userSetting.logo) {
      // Utiliza el formato base64 del campo logo para crear una URL de datos
      return `data:image/png;base64,${this.userSetting.logo}`;
    }

    return ''; // Puedes establecer un valor predeterminado o manejarlo según tus necesidades
  }
}
