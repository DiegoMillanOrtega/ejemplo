import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertsService {
  constructor() {}

  mostrarConfirmacion(): Promise<boolean> {
    return Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo',
    }).then((result) => {
      return result.isConfirmed;
    });
  }

  mostrarMensajeExito(titulo?: string, mensaje?: string): void {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'success',
    });
  }

  mostrarMensajeError(mensaje: string): void {
    Swal.fire({
      title: '¡Error!',
      text: mensaje,
      icon: 'error',
    });
  }

  escogerMensaje(type: string, msg: string) {
    switch (type) {
      case 'exito':
        this.mostrarMensajeExito(msg);
        break;
      case 'error':
        this.mostrarMensajeError(msg);
        break;
      case 'confirmacion':
        this.mostrarConfirmacion();
        break;
      default:
        break;
    }
  }
  cerrarAlerta() {
    // Cerrar todas las alertas abiertas
    Swal.close();
  }
  
  mostrarTabla(
    items: any[],
    titleTable: string,
    columns: { key: string; title: string }[],
    removeItemCallback?: (index: number) => void,
    actionButtons?: {
      label: string;
      callback: (trElement: HTMLTableRowElement) => void;
      class?: string;
    }[]
  ) {
    let tableHtml = `<table class="table table-striped table-responsive">
      <thead>
        <tr>`;

    columns.forEach((column) => {
      tableHtml += `<th>${column.title}</th>`;
    });

    if (actionButtons || removeItemCallback) {
      tableHtml += `<th>Acciones</th>`;
    }
    tableHtml += `</tr>
      </thead>
      <tbody>`;

    items.forEach((item, index) => {
      tableHtml += `<tr>`;
      columns.forEach((column) => {
        tableHtml += `<td>${item[column.key]}</td>`;
      });

      if (actionButtons || removeItemCallback) {
        tableHtml += `<td>`;
        if (actionButtons) {
          actionButtons.forEach((button) => {
            tableHtml += `<button class="btn ${
              button.class ?? 'btn-primary'
            } mx-1" data-index="${index}" data-action="${button.label}">${
              button.label
            }</button>`;
          });
        }
        if (removeItemCallback) {
          tableHtml += `<button class="btn btn-danger mx-1 action-remove" data-index="${index}">Eliminar</button>`;
        }
        tableHtml += `</td>`;
      }

      tableHtml += `</tr>`;
    });

    tableHtml += `</tbody></table>`;

    Swal.fire({
      title: titleTable,
      html: tableHtml,
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false,
      customClass: {
        popup: 'swal-wide',
      },
      didOpen: () => {
        // Listener para los botones de acción
        actionButtons?.forEach((button) => {
          document
            .querySelectorAll(`button[data-action="${button.label}"]`)
            .forEach((btn) => {
              (btn as HTMLElement).addEventListener('click', (event: any) => {
                const index = parseInt(
                  (event.target as HTMLElement).getAttribute('data-index')!,
                  10
                );
                const trElement = (event.target as HTMLElement).closest(
                  'tr'
                ) as HTMLTableRowElement;
                button.callback(trElement);
              });
            });
        });

        // Listener para el botón de eliminar
        if (removeItemCallback) {
          document.querySelectorAll('.action-remove').forEach((button) => {
            (button as HTMLElement).addEventListener('click', (event: any) => {
              const index = parseInt(
                (event.target as HTMLElement).getAttribute('data-index')!,
                10
              );
              removeItemCallback(index);
              (event.target as HTMLElement).closest('tr')?.remove(); // Opcional: elimina la fila visualmente
            });
          });
        }
      },
    });
  }
}
