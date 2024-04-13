import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../service/client.service';
import { Client } from '../../../model/client.model';
import Swal from 'sweetalert2';
import { AlertsService } from '../../../alerts/alerts.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  private serviceClient = inject(ClientService);
  private _clientService = inject(ClientService);
  private alerts = inject(AlertsService);

  clientsList: Client[] = [];
  findClient: string = ''
  loading: boolean = true;

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.serviceClient.findAllClients().subscribe(
      (paramas) => (this.clientsList = paramas),
      (error) => console.error('error al cargar lista de cliente ', error)
    );
  }

  async eliminarClient(id: number) {
    const resultado = await this.alerts.mostrarConfirmacion();
    if (resultado) {
      this.serviceClient.deleteClient(id).subscribe(
        (response) => {
          this.alerts.mostrarMensajeExito(
            '¡Eliminado!',
            'El cliente ha sido eliminado.')
          this.loadClients();
        },
        (error) => console.error(error)
      );
    }
  }

  buscarProductos() {
    this.loading = true;
    this._clientService.findClientByName(this.findClient).subscribe({
      next: (data) => {
        this.clientsList = data;
        this.findClient = '';
      },
      complete: () => {
        this.loading = false;
      },
    });
  }
}
