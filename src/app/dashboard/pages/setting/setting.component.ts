import { Component, OnInit, inject } from '@angular/core';
import { SettingService } from '../../../service/setting.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import Swal from 'sweetalert2';
import { AlertsService } from '../../../alerts/alerts.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit{
  
  
  public _settingService = inject(SettingService);
  private _loginService = inject(LoginService);
  private alert = inject(AlertsService);

  selectedLogo?: FormControl;
  
  newUserSetting: FormGroup;

  constructor(private form: FormBuilder) {
    this.selectedLogo = new FormControl(null);
    this.newUserSetting = this.form.group({
      nameSystem: [''],
      username: [''],
      logo: this.selectedLogo
    })

  }

  ngOnInit(): void {
    this._settingService.getUserSetting(this._settingService.getSharedUsername()).subscribe(
      params => {this.newUserSetting.patchValue(params)
      console.log(params)},
      error => console.error('error al setValue al formulario', error)  
      
    )
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0 ){
      this.selectedLogo?.setValue(inputElement.files[0])
    }
  }

  updateUserSetting() {

    const formData = new FormData();
    formData.append('nameSystem' , this.newUserSetting.get('nameSystem')?.value)
    formData.append('username' , this.newUserSetting.get('username')?.value)
    formData.append('logo', this.newUserSetting.get('logo')?.value)

    this._settingService.postUserSetting(formData).subscribe(
      response => {
        console.log('Post con éxito', response);
        this.alert.mostrarMensajeExito(
          '¡Actualizado!',
          'Configuración actualizada con éxito.'
        );
        this.newUserSetting.reset();
      },
      error => {
        console.error('Error al hacer el post', error);
        this.alert.mostrarMensajeError(
          'Error al actualizar la configuración.'
          );
      }
    );
  }

}
