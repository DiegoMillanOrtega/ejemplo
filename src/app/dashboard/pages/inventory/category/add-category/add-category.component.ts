import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../../../../service/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

  private categoryService = inject(CategoryService);

  newCategory: FormGroup;

  constructor(private form: FormBuilder) {
    this.newCategory = this.form.group({
      category: ['', Validators.required]
    })
  }

  enviarCategoria() {
    console.log(this.newCategory.value)
    this.categoryService.saveCategory(this.newCategory.value).subscribe(
      response => {
        console.log(response);
        Swal.fire({
          position: 'top-right',
          icon: 'success',
          title: 'Categoría guardada con éxito.',
          showConfirmButton: false,
          timer: 1300
        });
      }, 
      error => {
        console.error(error);
        Swal.fire({
          position: 'top-right',
          icon: 'error',
          title: 'Falló al guardar categoría.',
          showConfirmButton: false,
          timer: 1300
        });
      }
    );
    this.newCategory.reset();
  }
}
