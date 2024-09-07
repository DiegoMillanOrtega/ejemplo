import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastsService } from '../service/toasts.service';

interface Toast {
  title: string;
  message: string;
  type: 'success' | 'error';
}

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent implements OnInit{

  toasts: ToastMessage[] = [];

  constructor(private toastService: ToastsService) {}

  ngOnInit() {
    this.toastService.toastState$.subscribe((toast) => {
      this.toasts.push(toast);
      setTimeout(() => this.removeToast(toast), toast.duration);
    });
  }

  removeToast(toast: ToastMessage) {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

}
