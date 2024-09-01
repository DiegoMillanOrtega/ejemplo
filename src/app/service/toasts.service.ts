import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToastsService {
  private toastSubject = new Subject<ToastMessage>();
  toastState$ = this.toastSubject.asObservable();

  showToast(title: string, message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info', duration: number = 5000) {
    this.toastSubject.next({ title, message, type, duration });
  }
}

export interface ToastMessage {
  title: string;
  message: string;
  type: 'success' | 'danger' | 'warning' | 'info';
  duration: number;

}
