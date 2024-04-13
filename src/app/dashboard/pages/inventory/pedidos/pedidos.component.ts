import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InventoryService } from '../../../../service/inventory.service';
import Swal from 'sweetalert2';
import { CurrencyPipe } from '@angular/common';
import { PedidoService } from '../../../../service/pedido.service';
import { ClientService } from '../../../../service/client.service';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.component.html',
  styleUrl: './pedidos.component.css'
})
export class PedidosComponent {


  private routed = inject(ActivatedRoute);
  private _inventoryService = inject(InventoryService);
  private pedidoService = inject(PedidoService);
  private route = inject(Router);
  private serviceClient = inject(ClientService);

  pedidoForm: FormGroup;
  productId: number = 0;
  productName: string = '';
  clientSelected: string = '';
  stock: number = 0;
  loading: boolean = true;

  nameClients: string[] = [];
  
  constructor(private form: FormBuilder) {
    this.pedidoForm = this.form.group({
      id: ['', Validators.required],
      product: ['', Validators.required],
      category: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
      address: ['', Validators.required],
      client: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.routed.params.subscribe(params => {
      this.productId = params['productId'];
      this.productName = params['product'];

      this._inventoryService.getProductId(this.productId).subscribe(
        response => {
          console.log(response)
          this.pedidoForm?.patchValue(response);
          this.stock = this.pedidoForm.get('stock')?.value;
          console.log(this.stock)
          this.pedidoForm.get('id')?.disable();
          this.pedidoForm.get('product')?.disable();
          this.pedidoForm.get('price')?.disable();
        },
        error => console.error(error)
      )
    }
    );

    this.loadClients();
    setTimeout(() => {
      this.loading = false;
    }, 1000)
  }
  
  loadClients() {
    this.serviceClient.findAllClients().subscribe(
      clients => {
        // Utiliza el operador map para obtener solo los nombres de los clientes
        this.nameClients = clients.map(client => client.name + " " + client.lastName);
        console.log(clients)
      },
      error => console.error('Error al cargar lista de nombres de cliente ', error)
    );
  }

  // Método para mostrar la información del formulario en SweetAlert
  mostrarInfoPedido() {
    // Obtener los valores del formulario
    const id = this.pedidoForm.get('id')?.value;
    const product = this.pedidoForm.get('product')?.value;
    const price = this.pedidoForm.get('price')?.value;
    const stock = this.pedidoForm.get('stock')?.value;
    const address = this.pedidoForm.get('address')?.value;

    const currencyPipe = new CurrencyPipe('en-US');
    const precioFormateado = currencyPipe.transform(price * stock, 'USD', 'symbol', '1.2-2');
    this.pedidoForm.get('price')?.setValue(price * stock);

    // Crear el contenido HTML para SweetAlert
    const contenidoHtml = `
      <p><strong>Id del producto:</strong> ${id}</p>
      <p><strong>Nombre del producto:</strong> ${product}</p>
      <p><strong>Dirección:</strong> ${address}</p>
      <p><strong>Cantidad:</strong> ${stock}</p>
      <p><strong>Total a pagar:</strong> ${precioFormateado}</p>
    `;

    // Mostrar el cuadro de diálogo de SweetAlert con la información del formulario
    Swal.fire({
      title: 'Información del Pedido',
      html: contenidoHtml,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: "green",
      cancelButtonColor: "#d33"
    }).then(result => {
      if (result.isConfirmed) {
        this.pedidoForm.get('product')?.enable();
        this.pedidoForm.get('price')?.enable();

        this.pedidoService.savePedido(this.pedidoForm.value).subscribe(
          response => {
            console.log(response);

            Swal.fire({
              title: '¡Guardado!',
              text: 'El pedido fue guardado correctamente',
              icon: 'success',
              position: 'center',
              showConfirmButton: false,
              timer: 1300,
            });
            this.route.navigate(['/inventory']);
          },
          error => {
            console.error(error.error, error);

            Swal.fire({
              title: '¡Error!',
              text: 'Error al guardar el pedido',
              icon: 'error',
              position: 'center',
              showConfirmButton: false,
              timer: 1300,
            })
          }
        )
      }
    });
  }

  selectedClient(client: string) {
    this.pedidoForm.get('client')?.setValue(client);
  }
}
