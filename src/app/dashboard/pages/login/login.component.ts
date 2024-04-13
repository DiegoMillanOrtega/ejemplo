import { Component, OnInit, inject } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { SettingService } from '../../../service/setting.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent{

  
  private _loginService = inject(LoginService);
  private _settingService = inject(SettingService)
  
  
  user: FormGroup;
  constructor(private form: FormBuilder) {
    this.user = this.form.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  
  
  onSubmit() {
    const {username, password} = this.user.value;
    
    this._loginService.getUsers().subscribe(
      users => {

        if ( this.userExists(username, users)) {
          this.loginUser(username, password)      
        } else {
          console.log("usuario no existe");
        }

      },
      error => {
        console.error('error al obtener la lista de usuarios', error);
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // Manejar el caso específico de una respuesta personalizada
          console.log('Respuesta personalizada del servidor:', error.error);
        }
      }
    );
  }

  private loginUser(username: string, password: string) {
    this._loginService.login(username, password).subscribe(
      response => {
        console.log('Inicio de sesión exitoso. ',response);
        this._settingService.setSharedUsername(username);
      },
      error => {
        console.error('Error en la autenticacion', error);
        if (error instanceof HttpErrorResponse && error.status === 401) {
          console.log('Credenciales incorrectas');
        } else {
          console.log('error desconocido')
        }
      }
      );  
    }
    
  private userExists(username: string , userList: any[]): boolean {
    return userList.some( user => user.username === username )
  }

  hasError(controlName: string, errorType: string) {
    return this.user.get(controlName)?.hasError(errorType) && this.user.get(controlName)?.touched
  }

}
