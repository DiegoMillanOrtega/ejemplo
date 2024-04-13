import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../model/category.model';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private apiUrl: string = 'http://localhost:8080/category';
  private http = inject(HttpClient);

  getCategoryList(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/getCategoryList`);
  }

  searchCategoryByName(category: string): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.apiUrl}/search?category=${category}`);
  }
  
  searchCategoryById(id: number | string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/searchById/${id}`);
  }

  saveCategory(category: Category):Observable<any> {
    return this.http.post(`${this.apiUrl}/saveCategory`, category, {responseType: 'text'})
  }

  deleteCategory(id: number | string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteCategory/${id}`, {responseType: 'text'});
  }
}
