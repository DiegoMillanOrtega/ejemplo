import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ClientService } from '../../../../service/client.service';
import Swal from 'sweetalert2';
import { AlertsService } from '../../../../alerts/alerts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.css',
})
export class AddClientComponent {
  private serviceCliente = inject(ClientService);
  private alerts = inject(AlertsService);
  private route = inject(Router)

  newClient: FormGroup;

  constructor(private form: FormBuilder) {
    this.newClient = this.form.group({
      id: [''],
      name: [''],
      lastName: [''],
      gender: [''],
      address: [''],
      email: [''],
      phoneNumber: [''],
    });
  }
  addCliente() {
    const capitalizedValues = {
      ...this.newClient.value,
      lastName: this.capitalize(this.newClient.value.lastName),
      name: this.capitalize(this.newClient.value.name),
    };
    
    this.serviceCliente.addClient(capitalizedValues).subscribe(
      (response) => {
        this.alerts.mostrarMensajeExito(
          '¡Guardado!',
          'El cliente guardado correctamente.'
        );
        this.newClient.reset();
        this.route.navigate(['/client'])
      },
      (error) => this.alerts.mostrarMensajeError('Error al guardar el cliente')
    );
  }

  capitalize(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
  }
}
