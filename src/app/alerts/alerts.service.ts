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
    }[],
    itemsPerPage: number = 6, // Número de elementos por página
    showSearch: boolean = false // Flag para mostrar el buscador
  ) {
    let currentPage = 1;
    const totalPages = Math.ceil(items.length / itemsPerPage);
    let filteredItems = [...items]; // Inicialmente, todos los items están disponibles

    function getPageItems(page: number): any[] {
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      return filteredItems.slice(start, end);
    }

    function renderTable(page: number) {
      let tableHtml = `<div class="container">
        `;

      if (showSearch) {
        tableHtml += `<div class="input-group mb-3">
            <input
            class="form-control"
            type="search"
            placeholder="Buscar por nombre"
            aria-label="Search"
            id="searchInput"
            />
            <button
            class="btn btn-outline-success"
            type="button"
            id="searchButton"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
              <path
                d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
              />
            </svg>
          </button>
          </div>`;
      }

      tableHtml += `<table class="table table-striped table-responsive">
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

      const pageItems = getPageItems(page);
      pageItems.forEach((item, index) => {
        tableHtml += `<tr>`;
        columns.forEach((column) => {
          if (column.key === 'category' && typeof item[column.key] === 'object') {
            tableHtml += `<td>${item[column.key].category}</td>`;
          } else {
            tableHtml += `<td>${item[column.key]}</td>`;
          }
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

      let paginationHtml = `<nav aria-label="Page navigation">
        <ul class="pagination">`;

      // Previous Button
      paginationHtml += `<li class="page-item${
        currentPage === 1 ? ' disabled' : ''
      }">
          <a class="page-link" href="#" data-page="${
            currentPage - 1
          }">Previous</a>
        </li>`;

      // Page Number Buttons
      for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `<li class="page-item${
          i === currentPage ? ' active' : ''
        }">
            <a class="page-link" href="#" data-page="${i}">${i}</a>
          </li>`;
      }

      // Next Button
      paginationHtml += `<li class="page-item${
        currentPage === totalPages ? ' disabled' : ''
      }">
          <a class="page-link" href="#" data-page="${currentPage + 1}">Next</a>
        </li>`;

      paginationHtml += `</ul></nav>`;

      return tableHtml + paginationHtml;
    }

    function updateTable(page: number) {
      Swal.update({
        html: renderTable(page),
      });

      // Reañadir los listeners para los botones de acción y eliminar
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

      // Listener para los botones de paginación
      document.querySelectorAll('.page-link[data-page]').forEach((btn) => {
        (btn as HTMLElement).addEventListener('click', (event: any) => {
          event.preventDefault();
          const page = parseInt(
            (event.target as HTMLElement).getAttribute('data-page')!,
            10
          );
          if (page >= 1 && page <= totalPages) {
            currentPage = page;
            updateTable(currentPage);
          }
        });
      });

      // Listener para el buscador
      if (showSearch) {
        document
          .getElementById('searchButton')
          ?.addEventListener('click', () => {
            buscarProductos();
          });
        (
          document.getElementById('searchInput') as HTMLInputElement
        )?.addEventListener('keydown', (event) => {
          if (event.key === 'Enter') {
            buscarProductos();
          }
        });
      }
    }

    function buscarProductos() {
      const searchTerm = (
        document.getElementById('searchInput') as HTMLInputElement
      )?.value.toLowerCase();
      filteredItems = items.filter((item) =>
        columns.some((column) =>
          item[column.key]?.toString().toLowerCase().includes(searchTerm)
        )
      );
      currentPage = 1; // Reset to first page after search
      updateTable(currentPage);
    }

    Swal.fire({
      title: titleTable,
      html: renderTable(currentPage),
      showCloseButton: true,
      focusConfirm: false,
      showConfirmButton: false,
      customClass: {
        popup: 'swal-wide',
      },
      didOpen: () => {
        updateTable(currentPage);
      },
    });
  }
}
