import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientService } from '../../../../service/client.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AlertsService } from '../../../../alerts/alerts.service';

@Component({
  selector: 'app-details-client',
  templateUrl: './details-client.component.html',
  styleUrl: './details-client.component.css',
})
export class DetailsClientComponent implements OnInit {
  private serviceCliente = inject(ClientService);
  private alerts = inject(AlertsService);
  private _routed = inject(ActivatedRoute);
  private _route = inject(Router);

  nameClient: string = '';
  idClient: number = 0;
  detailsClient: FormGroup;
  loading: boolean = true;

  constructor(private form: FormBuilder) {
    this.detailsClient = this.form.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required],
      phoneNumber: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;
    }, 1000)

    this._routed.params.subscribe((params) => {
      this.idClient = params['id'];
    });

    this.serviceCliente.findClientById(this.idClient).subscribe(
      (params) => {
        this.nameClient = params.name + ' ' + params.lastName;
        this.detailsClient.patchValue(params);
      },
      (error) => console.error('Error al traer cliente', error)
    );
  }
  
  actualizarCliente() {
    console.log(this.detailsClient.value);
    this.serviceCliente.addClient(this.detailsClient.value).subscribe(
      (response) => {
        this.alerts.mostrarMensajeExito('¡Actualizado!', 'Cliente actualizado');
        this._route.navigate(['/client']);
      },
      (error) => this.alerts.mostrarMensajeError('Error al actualizar el cliente')
    );
  }
}
