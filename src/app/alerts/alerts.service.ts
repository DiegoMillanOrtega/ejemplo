import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  mostrarConfirmacion(): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      return result.isConfirmed;
    });
  }
  
  mostrarMensajeExito(titulo: string , mensaje: string): void {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success'
    });
  }

  mostrarMensajeError(mensaje: string): void {
    Swal.fire({
      title: '¡Error!',
      text: mensaje,
      icon: 'error'
    });
  }
  constructor() { }
}
